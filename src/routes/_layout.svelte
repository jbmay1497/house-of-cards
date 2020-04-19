<script>
	import {setContext} from 'svelte';
    import io from "socket.io-client";
    let socket = io();

	const connect = () =>{
        socket.on('connect', () => {
            console.log('Connected to server!');
        });
    };
	export let segment;
	segment = true;

	connect();

	setContext('socket', socket);

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

	setContext('sendMessage', sendMessage);

</script>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		min-height: 100%;
		min-width: 100%;
		background: linear-gradient(to right, darkgreen 0%, seagreen 20%, seagreen 80%, darkgreen 100%);
	}

	main {
		position: relative;
		margin: 0 auto;
	}
</style>
<svelte:head>
<link href="https://fonts.googleapis.com/css?family=Roboto:100,400&display=swap" rel="stylesheet">
</svelte:head>
<div>
	<main>
		<slot></slot>
	</main>
</div>
