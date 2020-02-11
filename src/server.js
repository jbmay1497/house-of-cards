import * as sapper from '@sapper/server';

let express = require("express"),
	app = express(),
	path =require("path"),
	http = require("http").Server(app),
	io = require('socket.io')(http);


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


app.use(sapper.middleware());
app.use(express.static(path.join(__dirname, "../static")));

//will change to db updates later, but for now just want to get room generation working
let users = [];
let gameRooms = {};
io.on("connection", socket =>
{
	console.log('A user connected');

	socket.on('createRoom', (username, fn) => {
		//need to update session, and include this user as owner of room
		users.push(username);
		let room_id = generateRoomCode();
		socket.join(`${room_id}`);
		console.log(`${username} joined room ${room_id}`);
		gameRooms[room_id] = true;
		fn(room_id);

	});

	socket.on('joinRoom', (room_id, fn) => {
		if (room_id in gameRooms){
			socket.join(`${room_id}`);
			fn(true, room_id);
			let num_users = io.nsps['/'].adapter.rooms[`${room_id}`].length;
			console.log(`${num_users} users in room ${room_id}` );
		}else{
			fn(false, room_id)
		}
	});

	//idt we need
	socket.on('disconnect', () =>{
		console.log('A user disconnected');
	});
});


http.listen(PORT, () => {
	console.log(`App started and available at http://localhost:${PORT}`);
});

//move somewhere else later
let generateRoomCode = () =>{
	return Math.random().toString(36).replace('0.', '')
}