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
    div{
       font-family: "Roboto", serif;
       font-weight:100;
       color:white;
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
    import {goto} from "@sapper/app"
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    //import {sendMessage } from "../routes/networking";
    import { stores } from '@sapper/app';
    const { session } = stores();

    let lobby_id = "";
    let username = "";
    export let hidden = false;

    let joinLobby = () =>{
        console.log(`username is ${username}`);
        if (!username){
          document.getElementById('error-containerJoinRoom').innerHTML = "username cannot be blank";
        }else{
             sendMessage({
                action: "joinLobby",
                username: username,
                lobby_id: lobby_id,
                enterLobby: enterLobby
            })
        }

        };

    let enterLobby = lobby => {
        if (!lobby.error){

            let s_new = {
                username: username,
                lobby_id: lobby_id
            };
            session.set(s_new);
            goto(`lobbies/${lobby_id}`);
        }else{
            document.getElementById('error-containerJoinRoom').innerHTML = lobby.error;
            username = "";
        }
    };

    let returnToIndex = ()=>{
       hidden = true;
       username = "";
       lobby_id = "";
       document.getElementById('error-containerJoinRoom').innerHTML = "";
    }
</script>

<div class="modal">
    <div class="modal-content">
        <h1>Join a Room</h1>
        <div id = 'error-containerJoinRoom'></div>
        <div>
        Code: <input type="text" name="code" bind:value = {lobby_id}><br>
        Name: <input type="text" name="name" bind:value = {username}><br>
        </div>
            <button on:click ={returnToIndex}>Go Back</button>
            <button on:click ={joinLobby}>Join</button>
    </div>
</div>