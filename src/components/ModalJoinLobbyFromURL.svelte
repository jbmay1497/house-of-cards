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
</style>

<script>
    //This modal is to allow users to join a lobby by entering the lobby url
    import {goto} from "@sapper/app"
    import { stores } from '@sapper/app';
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    //import {sendMessage } from "../routes/networking";
    const { session } = stores();

    //allows the modal to dispatch a joined event to the lobby component
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let lobby_id;
    let username;

     let joinLobby = () =>{
         console.log(`username is ${username}`);
         if (!username){
              document.getElementById('error-container').innerHTML = "Username cannot be blank";
         }
         else{
             sendMessage({
                 action: "joinLobby",
                 username: username,
                 lobby_id: lobby_id,
                 enterLobby: enterLobby
             })
         }

     };


    //sets session with lobby_id and username, and informs the lobby
    //that a new user joined
    let enterLobby = lobby => {
         if (!lobby.error){
            let s_new = {
                username: username,
                lobby_id: lobby_id
            };
            session.set(s_new);
            dispatch('join', {
                joined: true,
                username: username
            });

          }else{
             document.getElementById('error-container').innerHTML = lobby.error;
             username = "";
          }

     };

    let returnToIndex = ()=>{
        goto("");
    }
</script>

<div class="modal">
 <div class="modal-content">

<h1>Enter Username</h1>
<div id = "error-container"></div>
<input type="text" name="username" bind:value = {username}>
<button on:click ={returnToIndex}>Go Back</button>
<button on:click={joinLobby}>Enter</button>
</div>
</div>