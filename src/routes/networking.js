import io from "socket.io-client";
const socket = io();
import {updateLobby} from "./lobbies/[lobby_id].svelte";

//called by client.svelte to set up client socket
//sets up event listeners on the client side sent from the server
export const connect = () =>{
    socket.on('connect', () => {
        console.log('Connected to server!');
    });
};

//tells server to generate a new lobby code
export const createLobby = (username, enterLobby) =>
{
    console.log("called createLobby");
    socket.emit("createLobby", username, lobby_id => {
        enterLobby(lobby_id)
    })
};

//socket tries to join a lobby given lobby id
export const joinLobby =  (lobby_id, username, enterLobby) =>
{
    socket.emit("joinLobby", lobby_id, username, joined =>{
        enterLobby(joined)
    });
};

export const getLobby = (lobby_id, test) =>
{
    console.log("got to get lobby");
    socket.emit("getLobby", lobby_id, test)

};

socket.on("userJoined", updateLobby);


