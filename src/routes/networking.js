import io from "socket.io-client";
const socket = io();
import {updateLobby} from "./lobbies/stores.js";
import {updateMessages} from "../components/Chat.svelte";

//const dispatch = createEventDispatcher();
//called by client.svelte to set up client socket
//sets up event listeners on the client side sent from the server
export const connect = () =>{
    socket.on('connect', () => {
        console.log('Connected to server!');
        socket.on("userJoined", updateLobby);

        socket.on("userLeft", updateLobby);
        //console.log(socket);
        socket.on("messageReceived", updateMessages);

    });
};
export const sendMessage = message =>{
    const action = message.action;
    switch (action){
        //generate new lobby
        case "createLobby":
            socket.emit(action, message.username, lobby_id => {
                message.enterLobby(lobby_id);
            });
            break;
        //user can join an existing lobby
        case "joinLobby":
            socket.emit(action, message.lobby_id, message.username, lobby =>{
                message.enterLobby(lobby)
            });
            break;
        case 'leaveLobby':
            socket.emit(action, message.lobby_id, message.username,lobby =>{
                message.exitLobby(lobby)
            });
            break;
        case "sendChatMessage":
            socket.emit(action, message.message);
            break;
    }

};
