import io from "socket.io-client";
const socket = io();
import {updateLobby} from "./lobbies/stores.js";
import {enterGame} from "./lobbies/[lobby_id].svelte";
import {updateBoard} from "./game/chess/stores.js";
import {updateCardPos, resetDeck} from "./game/custom/stores";
import {updateMessages} from "../components/Chat.svelte";
import {enterNewGame} from "./game/chess/stores.js";
import {leaveGame} from "./game/chess/[chess_id].svelte";



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
        socket.on('enterGame', enterGame);
        socket.on('updatedBoard', updateBoard);//something);
        socket.on('updateCardPos', updateCardPos);
        socket.on('resetDeck', resetDeck);
        socket.on('enterNewGame', enterNewGame);
        socket.on('leaveGame', leaveGame)

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
        case "createGame":
            socket.emit(action, message.game_id, message.gametype, message.host, message.usernames);
            break;
        //could probably extend to handle any game type
        case "startNewGame":
            socket.emit(action, message.game_id, message.username);
            break;
        case "stopGame":
            socket.emit(action, message.game_id);
            break;
        case "updateSessionGame":
            socket.emit(action, message.gametype);
            break;
        case "makeMove":
            socket.emit(action, message.game_id, message.from, message.to);
            break;
        case "customCardUpdate":
            socket.emit(action, message.game_id, message.cur_card);
            break;
        case "resetDeck":
            socket.emit(action, message.game_id, message.deck);
            break;
    }

};

