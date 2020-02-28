<svelte:head>
    <title>Create Lobby</title>
</svelte:head>

<style>
    h1{
     font-family: 'Roboto',serif ;
      font-weight: 100;
      color:white;
    }
    div{
        font-family: 'Roboto',serif ;
        font-weight: 100;
        color: white;
    }
</style>
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
        goto(`lobbies/${lobby_id}`);
        };
</script>


<h1>Create</h1>
<form on:submit|preventDefault={() => createLobby(username, enterLobby)}>
    <div>Name: <input type="text" name="name" bind:value = {username}></div>
    <input type="submit" value="Submit">
</form>

