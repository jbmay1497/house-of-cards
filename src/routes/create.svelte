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

    function clickHandler() {
        goto('gameroom');

        // $.post("/v1/session", {
        //     "username": $('#username').val(),
        //     "password": $('#password').val()
        // })
        //         .done(function() {
        //             window.location = "/profile.html?username=" + $('#username').val();
        //         })
        //         .fail(function() {
        //             document.getElementById('errorMsg').innerHTML="Incorrect username or password";
        //         });
    }

</script>


<h1>Create</h1>
<form on:submit|preventDefault={() => createRoom(username, enterRoom)}>
    Name: <label><input type="text" name="name" bind:value = {username}></label><br>
    <input type="submit" value="Submit">
</form>

