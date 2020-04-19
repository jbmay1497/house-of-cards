"use strict";

import * as sapper from '@sapper/server';
//import {setupDB} from "./database";

require('dotenv').config({path: "src/config.env"});
let express = require("express"),
	app = express(),
	path =require("path"),
	sirv = require('sirv'),
	http = require("http").Server(app),
	session = require("express-session"),
	mongoose = require("mongoose"),
	logger = require("morgan");



const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

//turn into function once db is set up
//setup express pipeline



app.use(sirv('static', { dev }));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*****************************************************************************************************/

//setup pipeline session and sapper session
//need to add a store for production
let expSession = session({
	name: "session",
	secret: "onemoretime",
	resave: false,
	saveUninitialized: true,
	cookie: {
		path: "/",
	}
});

app.use(expSession);

app.use(sapper.middleware({
	session: (req, res) => {
		return {
			username: req.session.username,
			lobby_id: req.session.lobby_id,
			game:req.session.game
		};
	}
}));

/*****************************************************************************************************/

//set up db
try {
	// console.log("Connecting to MongoDB");
	mongoose.set("useFindAndModify", false); // New deprecation warnings
	mongoose.set("useCreateIndex", true); // New deprecation warnings
	mongoose.set("useUnifiedTopology", true);
	mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true, // New deprecation warnings
	});
	console.log(`MongoDB connected: ${process.env.MONGO_URL}`); //change to config file
} catch (err) {
	console.log(err);
	process.exit(-1);
}

import lobby from "./models/lobby"
import chess from "./models/chess"
import oldmaid from "./models/oldmaid"

app.models = {
	Lobby: lobby,
	Chess: chess,
	OldMaid: oldmaid
};

/*****************************************************************************************************/

//import data controllers and routes
import {lobby_funcs } from "./controllers/lobby";
import {chess_funcs } from "./controllers/chess";
import {oldmaid_funcs } from "./controllers/oldmaid";
let lobby_controller = lobby_funcs(app);
let chess_controller = chess_funcs(app);
let oldmaid_controller = oldmaid_funcs(app);
app.controllers = {
	Lobby: lobby_controller,
	Chess: chess_controller,
	OldMaid: oldmaid_controller
};

/*****************************************************************************************************/

//setup websocket session
let sharedsession = require("express-socket.io-session");
let io = require('socket.io')(http);
io.use(sharedsession(expSession));

//adding websocket support
io.on("connection", socket =>
{
	if (socket.handshake.session && socket.handshake.session.username && socket.handshake.session.lobby_id) {
		socket.handshake.session.reload(async () =>{
			const username = socket.handshake.session.username;
			const lobby_id = socket.handshake.session.lobby_id;
			console.log(`Reconnecting: ${username}`);
			socket.join(`${lobby_id}`);
			socket.handshake.session.save();
		});

	}
	else{
		console.log("a user connected")
	}

	socket.on('createGame', (game_id, gametype, host, usernames) =>{
		socket.handshake.session.reload(async ()=>{

			const cur_game = socket.handshake.session.game;
			if (cur_game) return;
			//this to call controller function - kind of like redux
			let game_data;
			switch(gametype){
				case "chess":
					game_data = await app.controllers.Chess.createChess(game_id, host, usernames);
					break;
				case "oldmaid":
					game_data = await app.controllers.OldMaid.createOldMaid(game_id, host, usernames);
					break;
			}
			if (game_data && game_data.error) return;
			console.log(`${host} started ${gametype} game ${game_id}`);
			socket.handshake.session.game = gametype;
			await socket.handshake.session.save();
			await app.controllers.Lobby.toggleGame(game_id);
			io.sockets.in(`${socket.handshake.session.lobby_id}`).emit('enterGame', gametype);
		});
	});
	//extend to handle oldmaid
	socket.on('startNewGame', (game_id, username) =>{
		console.log(game_id);
		socket.handshake.session.reload(async()=>{
			let updated_game = await app.controllers.Chess.startNewChess(game_id, username);
			if (updated_game && updated_game.error) return;
			io.sockets.in(`${socket.handshake.session.lobby_id}`).emit('updateGame', updated_game);
		})
	});
	socket.on('stopGame', (game_id, gametype) =>{
		socket.handshake.session.reload(async()=>{
			let updated_game;
			switch(gametype){
				case "chess":
					updated_game = await app.controllers.Chess.stopChess(game_id);
					break;
				case "oldmaid":
					updated_game = await app.controllers.OldMaid.stopOldMaid(game_id);
					break;
			}
			if (updated_game && updated_game.error) return;
			socket.handshake.session.game = "";
			await app.controllers.Lobby.toggleGame(game_id);
			io.sockets.in(`${socket.handshake.session.lobby_id}`).emit('leaveGame');
		})
	});


	socket.on('updateSessionGame', gametype =>{
		socket.handshake.session.reload(async () =>{
			socket.handshake.session.game = gametype;
			await socket.handshake.session.save();
		})
	});

	socket.on("customCardUpdate", async(game_id, cur_card)=>{
		if (game_id !== socket.handshake.session.lobby_id) {
			return;
		}
		socket.to(`${socket.handshake.session.lobby_id}`).emit('updateCardPos', cur_card);
	});

	socket.on("resetDeck", async(game_id, deck)=>{
		if (game_id !== socket.handshake.session.lobby_id) {
			return;
		}
		socket.to(`${socket.handshake.session.lobby_id}`).emit('deckReset', deck);
	});

	socket.on('makeMove', async (game_id, from, to)=>{
		if (game_id !== socket.handshake.session.lobby_id){
			return;
		}let updated_game = await app.controllers.Chess.makeMove(game_id, from, to);
		if (updated_game.error){
			return;
		}
		io.sockets.in(`${socket.handshake.session.lobby_id}`).emit('updateGame', updated_game);
	});

	socket.on('createLobby', (username, fn) => {
		socket.handshake.session.reload(async ()=>{

			const cur_username = socket.handshake.session.username;
			const cur_lobby_id = socket.handshake.session.lobby_id;
			if (cur_username || cur_lobby_id) return;
			let lobby_id = generateLobbyCode();
			//this to call controller function - kind of like redux
			let lobby_data = await app.controllers.Lobby.createLobby(lobby_id, username);
			if (lobby_data.error) return;
			socket.join(`${lobby_id}`);
			console.log(`${username} joined lobby ${lobby_id}`);
			socket.handshake.session.username = username;
			socket.handshake.session.lobby_id = lobby_id;
			socket.handshake.session.save();
			fn(lobby_id);
		});
	});

	//don't think we need, as preload requires a fetch
	socket.on("getLobby", async (lobby_id, fn) => {
		let lobby_data =  await app.controllers.Lobby.getLobby(lobby_id);
		fn(lobby_data)
	});

	socket.on('joinLobby', async (lobby_id, username, fn) => {
		socket.handshake.session.reload(async () =>{
			let lobby = await app.controllers.Lobby.joinLobby(lobby_id, username);
			if (!lobby.error){
				socket.join(`${lobby_id}`);
				io.to(`${lobby_id}`).emit("usersChanged",
					{usernames: lobby.usernames});
				socket.handshake.session.username = username;
				socket.handshake.session.lobby_id = lobby_id;
				socket.handshake.session.save();
			}
			fn(lobby);
		});

	});

	socket.on('leaveLobby', async (lobby_id, username, fn) =>{
		socket.handshake.session.reload(async () =>{
			let lobby = await app.controllers.Lobby.leaveLobby(lobby_id, username);
			if (!lobby || !lobby.error){
				socket.leave(`${lobby_id}`);
				//change to userLeft
				if (lobby){
					io.to(`${lobby_id}`).emit("usersChanged",
						{usernames: lobby.usernames,
						host: lobby.host});
				}
				socket.handshake.session.username = "";
				socket.handshake.session.lobby_id = "";
				socket.handshake.session.save();
			}
			fn(lobby);
		});
	});


	socket.on('sendChatMessage', async message =>{
		//should probably pass username and lobby id from chat to error check
		let username = socket.handshake.session.username;
		let lobby_id = socket.handshake.session.lobby_id;
		io.to(`${lobby_id}`).emit("messageReceived", `${username}: ${message}`)
	});

	socket.on('removeDuplicates', async(game_id, hand, playerIndex, done, allDone, turn) =>{
		if (game_id !== socket.handshake.session.lobby_id){
			return;
		}
		let updated_game = await app.controllers.OldMaid.removeDuplicates(game_id, hand, playerIndex, done, allDone,
			turn);
		io.sockets.in(`${socket.handshake.session.lobby_id}`).emit('duplicatesRemoved', updated_game);
	});

	socket.on('moveCard', async(game_id, handTo, handFrom, toIndex, fromIndex,
		turn, skip) =>{
		if (game_id !== socket.handshake.session.lobby_id){
			return;
		}
		let updated_game = await app.controllers.OldMaid.moveCard(game_id, handTo, handFrom, toIndex, fromIndex,
			turn, skip);
		socket.to(`${socket.handshake.session.lobby_id}`).emit('cardMoved', updated_game);
	});

	socket.on('disconnect', () =>{
		console.log(`${socket.handshake.session.username} disconnected`);
		console.log(`${socket.handshake.session.game}`);
		if (socket.handshake.session.lobby_id){
			socket.leave(`${socket.handshake.session.lobby_id}`);
		}

	});
});

/*****************************************************************************************************/

//listen for reqs
http.listen(PORT, () => {
	console.log(`App started and available at http://localhost:${PORT}`);
});

//move somewhere else later
let generateLobbyCode = () =>{
	return Math.random().toString(36).replace('0.', '').substr(0,5);
};