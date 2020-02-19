import * as sapper from '@sapper/server';

let express = require("express"),
	app = express(),
	path =require("path"),
	sirv = require('sirv'),
	http = require("http").Server(app),
 	session = require("express-session"),
	logger = require("morgan");


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

//setup express pipeline

//app.use(express.static(path.join(__dirname, "../static")));
app.use(sirv('static', { dev }));
app.use(logger("dev"));

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
	session: (req, res) => ({
		username: req.session.username ? req.session.username : "",
		gameroom: req.session.gameroom ? req.session.gameroom : ""
	})
}));

/*****************************************************************************************************/

//setup websocket session
let sharedsession = require("express-socket.io-session");
let io = require('socket.io')(http);
io.use(sharedsession(expSession));


//will change to db updates later, but for now just want to get room generation working
let gameRooms = {};
export default gameRooms
//adding websocket support
io.on("connection", socket =>
{
	if (socket.handshake.session && socket.handshake.session.username) {
		const username = socket.handshake.session.username;
		console.log(`Reconnecting: ${username}`);
	}
	else{
		console.log("a user connected")
	}

	socket.on('createRoom', (username, fn) => {
		//need to update session, and include this user as owner of room
		socket.handshake.session.reload(async ()=>{
			let room_id = generateRoomCode();
			socket.join(`${room_id}`);
			console.log(`${username} joined room ${room_id}`);
			socket.handshake.session.username = username;
			socket.handshake.session.gameroom = room_id;
			socket.handshake.session.save();
			gameRooms[room_id] = {};
			gameRooms[room_id].usernames = [username];
			gameRooms[room_id].count = 1;
			gameRooms[room_id].room_id = room_id;
			fn(room_id);
		});
	});

	socket.on('joinRoom', (room_id, fn) => {
		if (room_id in gameRooms){
			socket.join(`${room_id}`);
			fn(true, room_id);
			//let num_users = io.nsps['/'].adapter.rooms[`${room_id}`].length;
		}else{
			fn(false, room_id)
		}
	});

	socket.on('test', msg => {
		socket.emit('test', msg)
	});

	//idt we need
	socket.on('disconnect', () =>{
		console.log('A user disconnected');
	});
});

/*****************************************************************************************************/

//listen for reqs
http.listen(PORT, () => {
	console.log(`App started and available at http://localhost:${PORT}`);
});

//move somewhere else later
let generateRoomCode = () =>{
	return Math.random().toString(36).replace('0.', '')
}