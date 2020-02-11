import io from "socket.io-client";
const socket = io();


//called by client.svelte to set up client socket
//sets up event listeners on the client side sent from the server
export const connect = () =>{
    socket.on('connect', () => {
        console.log('Connected to server!');
    });
};

//tells server to generate a new room code
export const createRoom = (username, enterRoom) =>
{
    socket.emit("createRoom", username, (room_id) => {
        enterRoom(room_id)
    })
};

//socket tries to join a room given room id
export const joinRoom =  (room_id, enterRoom) =>
{
    socket.emit("joinRoom", room_id, (joined, room_id) =>{
        enterRoom(joined, room_id)
    });
};