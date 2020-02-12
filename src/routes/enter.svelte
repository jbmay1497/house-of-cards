<svelte:head>
	<title>Join room</title>
</svelte:head>

<script>
    import {goto} from "@sapper/app"
     import {joinRoom } from "./networking";

    let room_id = "";
    //will be used when session is set up
    let username = "";

    let enterRoom = (joined, room_id) => {
        if (joined){
            goto("gameroom");//gameroom/room_id
        }else{
            document.getElementById('error-container').innerHTML = `Room code "${room_id}" does not exist! try another code`;
        }

    };
</script>

<h1>Enter</h1>
<div id = "error-container"></div>
<form on:submit|preventDefault={() => joinRoom(room_id, enterRoom)}>
	Code: <label><input type="text" name="code" bind:value = {room_id}></label><br>
	Name: <label><input type="text" name="name" bind:value = {username}></label><br>
	<input type="submit" value="Submit">
</form>