

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
        z-index: 999;
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

    h1 {
        color: white;
    }
</style>

<script>
    export let username;
    export let game_id;

    export let hidden = 0;
    export let winner;

    export let host;


     import {getContext} from 'svelte';
     const sendMessage = getContext('sendMessage');

    let winnerNameDisplayed = winner === username ? "You" : winner;

    let returnToIndex = ()=>{
        hidden = true;
    };

    //could probably change action to handle any game
    let startNewGame = (game_id, username) => {
        sendMessage({
        action:"startNewGame",
        game_id: game_id,
        username:username
        })
    };

    let stopGame = () => {
        if (host === username){
            sendMessage({
            action: 'stopGame',
            game_id: game_id
            });
        }
    }
</script>

<div class="modal">
    <div class="modal-content">
        {#if !winner}
            <h1>The game is in stalemate</h1>
        {:else}
            <h1>{winnerNameDisplayed} won the game!</h1>
        {/if}
        {#if username === host}
        <h1> What do you want to do?</h1>
          <br>
        <button on:click = {stopGame}>Back to Lobby</button>
        <button on:click = {() => startNewGame(game_id, username)}>Start New Game</button>
        {:else}
        <h1> Waiting for action from host</h1>
        {/if}
    </div>
</div>