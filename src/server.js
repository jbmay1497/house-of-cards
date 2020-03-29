"use strict";

import * as sapper from '@sapper/server';
//import {setupDB} from "./database";

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
app.use(express.urlencoded());
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
			lobby_id: req.session.lobby_id
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
	mongoose.connect("mongodb://localhost:32769/jbmay1497", {
		useNewUrlParser: true, // New deprecation warnings
	});
	console.log(`MongoDB connected: mongodb://localhost:32769/jbmay1497`); //change to config file
} catch (err) {
	console.log(err);
	process.exit(-1);
}

import lobby from "./models/lobby"

app.models = {
	Lobby: lobby
};

/*****************************************************************************************************/

//import data controllers and routes
import {lobby_funcs } from "./controllers/lobby";
let lobby_controller = lobby_funcs(app);
app.controllers = {
	Lobby: lobby_controller
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
				io.to(`${lobby_id}`).emit("userJoined",
					{playerCount: lobby.playerCount,
						usernames: lobby.usernames});
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
					io.to(`${lobby_id}`).emit("userLeft",
						{playerCount: lobby.playerCount,
							usernames: lobby.usernames});
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

	socket.on('disconnect', () =>{
		console.log(`${socket.handshake.session.username} disconnected`);
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