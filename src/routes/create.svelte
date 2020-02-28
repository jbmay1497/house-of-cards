<svelte:head>
    <title>Create Lobby</title>
</svelte:head>

<script>
    import { stores } from '@sapper/app';
     const { session } = stores();
    import {goto} from "@sapper/app"
    import { createLobby } from  "./networking";

    let username = "";

    let enterLobby = lobby_id => {
        let s_new = {
            username: username,
            lobby_id: lobby_id
        };

        session.set(s_new);
         console.log("got to enterLobby");
        goto(`lobbies/${lobby_id}`);
        };
</script>


<h1>Create</h1>
<form on:submit|preventDefault={() => createLobby(username, enterLobby)}>
    Name: <label><input type="text" name="name" bind:value = {username}></label><br>
    <input type="submit" value="Submit">
</form>

