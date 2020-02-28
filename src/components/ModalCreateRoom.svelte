<style>
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        padding: .5rem 1.5rem;
        width: 24rem;
        border-radius: 0.5rem;
        margin-bottom: 5px;
        text-align: center;
    }

    h1{
        font-family: "Roboto", serif;
        font-weight: 100;
    }

    button:hover {
        background-color: darkgrey;
    }

    button {
        font-family: "Roboto", serif;
        font-weight: 100;
        max-width: 200px;
        min-width: 150px;
        max-height: 2em;
        background: white;
        color: black;
        border: none;
        border-radius: 5px;
        line-height: 2em;
        font-size: 0.8em;
        margin-right: 5px;
    }

    input{
        display: block;
        margin : 0.5em auto;
        width: 75%;
    }

    h1 {
        color: white;
    }
</style>

<script>
    import { stores } from '@sapper/app';
    const { session } = stores();
    import {goto} from "@sapper/app"
    import { createLobby } from  "../routes/networking";

    let username = "";

    let enterLobby = lobby_id => {
        let s_new = {
            username: username,
            lobby_id: lobby_id
        };

        session.set(s_new);
        goto(`lobbies/${lobby_id}`);
    };

    let returnToIndex = ()=>{
        goto("");
    }
</script>

<div class="modal">
    <div class="modal-content">
        <h1>Create a Room</h1>
        <form on:submit|preventDefault={() => createLobby(username, enterLobby)}>
            Name: <label><input type="text" name="name" bind:value = {username}></label><br>
            <button on:click ={returnToIndex}>Go Back</button>
            <button type="submit">Create</button>
        </form>
    </div>
</div>