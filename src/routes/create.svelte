<svelte:head>
    <title>Create Room</title>
</svelte:head>

<script>
    import {goto} from "@sapper/app"
    import { createRoom } from  "./networking";

    let username = "";

    let enterRoom = room_id => {
        goto("gameroom");//gameroom/room_id
    };
</script>


<h1>Create</h1>
<form on:submit|preventDefault={() => createRoom(username, enterRoom)}>
    Name: <label><input type="text" name="name" bind:value = {username}></label><br>
    <input type="submit" value="Submit">
</form>

