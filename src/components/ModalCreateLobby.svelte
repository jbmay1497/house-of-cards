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

   div{
   font-family: "Roboto", serif;
   font-weight:100;
   color:white;
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
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    // import { getContext } from  "../routes/networking";

    let username = "";
    export let hidden = false;

    let createLobby = () =>{
        if (!username){
          document.getElementById('error-containerCreateRoom').innerHTML = "username cannot be blank";
        } else if (username.length > 15){
            document.getElementById('error-container').innerHTML =
            "Username cannot be longer than 15 characters";
            username = "";
        }else{
           sendMessage({
               action: "createLobby",
               username: username,
               enterLobby: enterLobby
           })

        }
    };

    let enterLobby = lobby_id => {
        let s_new = {
            username: username,
            lobby_id: lobby_id,
            game: ''
        };

        session.set(s_new);
        goto(`/lobbies/${lobby_id}`);
    };

    let returnToIndex = ()=>{
        hidden = true;
        username = "";
        document.getElementById('error-containerCreateRoom').innerHTML = "";
    }
</script>

<div class="modal">
    <div class="modal-content">
        <h1>Create a Lobby</h1>
        <div id = 'error-containerCreateRoom'></div>
        <div>
            Username: <input type="text" name="name" bind:value = {username}><br>
        </div>
        <button on:click ={returnToIndex}>Go Back</button>
        <button on:click = {createLobby}>Create</button>
    </div>
</div>