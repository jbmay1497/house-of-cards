<svelte:head>
	<title>Join Lobby</title>
</svelte:head>

<script>
    import {goto} from "@sapper/app"
    import {joinLobby } from "./networking";
    import { stores } from '@sapper/app';
    const { session } = stores();

    let lobby_id = "";
    let username = "";

    let enterLobby = lobby => {
        if (!lobby.error){

            let s_new = {
                username: username,
                lobby_id: lobby_id
             };
            session.set(s_new);
            goto(`lobbies/${lobby_id}`);
        }else{
            document.getElementById('error-container').innerHTML = lobby.error;
            username = "";
        }

    };
</script>

<h1>Enter</h1>
<div id = "error-container"></div>
<form on:submit|preventDefault={() => joinLobby(lobby_id, username, enterLobby)}>
	Code: <label><input type="text" name="code" bind:value = {lobby_id}></label><br>
	Name: <label><input type="text" name="name" bind:value = {username}></label><br>
	<input type="submit" value="Submit">
</form>