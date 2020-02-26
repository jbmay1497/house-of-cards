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
        background-color: white;
        padding: .5rem 1.5rem;
        width: 24rem;
        border-radius: 0.5rem;
        margin-bottom: 5px;
        text-align: center;
    }

    button:hover {
        background-color: darkblue;
    }

    button {
      max-width: 200px;
      min-width: 150px;
      max-height: 2em;
      background: #6495ed;
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
    //This modal is to allow users to join a room by entering the gameroom url
    import {goto} from "@sapper/app"
    import { stores } from '@sapper/app';
    import {joinRoom } from "../routes/networking";
    const { session } = stores();

    //allows the modal to dispatch a joined event to the gameroom component
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let room_id;
    let username;

    //sets session with room_id and username, and informs the gameroom
    //that a new user joined
    let enterRoom = joined => {
            if (joined){
                let s_new = {
                    username: username,
                    gameroom: room_id
                };
                session.set(s_new);
                dispatch('join', {
                	joined: true,
                	username: username
                });

            }

        };

    let returnToIndex = ()=>{
        goto("");
    }
</script>

<div class="modal">
 <div class="modal-content">

<h1>Enter Username</h1>
<input type="text" name="username" bind:value = {username}>
<button on:click ={returnToIndex}>Go Back</button>
<button disabled = {!username} on:click={() => joinRoom(username, room_id, enterRoom)}>Enter</button>
</div>
</div>