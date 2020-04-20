<script context="module" xmlns="http://www.w3.org/1999/html">

     export async function preload({ params }, session) {
    //checks if the user enters the lobbies through the /enter route,
    //or through the lobbys url

    //checks if user is in a different lobby, then redirects them there
    if (!session.lobby_id){
         return this.redirect(302, `/`);
    }else if (!session.game || session.game !== "chess"){
        return this.redirect(302, `lobbies/${session.lobby_id}`);
    }else if (session.lobby_id !== params.chess_id){
        return this.redirect(302, `game/chess/${session.lobby_id}`);
    }

    //fetching lobbies data
    const res = await this.fetch(`api/games/chess/${params.chess_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const game_data = await res.json();
    if (res.status === 200) {
      game_data.username = session.username;
      return { chess_game: game_data };
    } else {
      this.redirect(302, ``);
    }
  }
</script>

<script>
import ChessModalGameOver from "../../../components/chessModalGameOver.svelte"
import Board from "./_Board.svelte";
import {goto} from "@sapper/app";
import {getContext} from 'svelte';
const sendMessage = getContext('sendMessage');
const socket = getContext('socket');
import { onDestroy } from 'svelte';
 import { stores } from '@sapper/app';
const { session } = stores();
 import { get } from 'svelte/store';

export let chess_game;
    let username = chess_game.username;
    let black = chess_game.black;
    let white = chess_game.white;
    let game_id = chess_game._id;
    let board = chess_game.board;
    let turn = chess_game.turn;
    let finished = chess_game.finished;
    let host = chess_game.host;

    let rows = [0, 1, 2, 3, 4, 5, 6, 7];
    let cols = [0, 1, 2, 3, 4, 5, 6, 7];

    //prob dont need, just have host choose color
    if (username === black){
        rows = rows.reverse();
        cols = cols.reverse();
    }


    function updateGame(updated_game) {
        board = updated_game.board;
        turn = updated_game.turn;
        finished = updated_game.finished;
        let white_turn_square = document.getElementById("white-turn");
        let black_turn_square = document.getElementById("black-turn");
        if (turn === white){
            white_turn_square.style["background-color"] = "white";
            black_turn_square.style["background-color"] = "gray";
        }else{
            white_turn_square.style["background-color"] = "gray";
            black_turn_square.style["background-color"] = "black";
        }
    }


    socket.on('updateGame', updateGame);


    let StopGame = () => {
        if (host === username){
            sendMessage({
            action: 'stopGame',
            game_id: game_id,
            gametype: "chess"
            });
        }
    };

    let startNewGame = (game_id, username) => {
        sendMessage({
        action:"startNewGame",
        game_id: game_id,
        username:username
        })
    };


    function leaveGame(){

       let session_data = (get(session));
       let s_new = {
            username: session_data.username,
            lobby_id: session_data.lobby_id,
            game: ""
          };
       session.set(s_new);
       sendMessage({
           action: "updateSessionGame",
           gametype: ""
           });
        goto(`lobbies/${session_data.lobby_id}`);
    }

    socket.on('leaveGame', leaveGame);

    onDestroy(() =>{
        socket.off('updateGame');
        socket.off('leaveGame');
    })
</script>

<style>

    .button-container{
        padding:0.7em 1.4em;
            margin:0 0.3em 0.3em 0;
            border-radius:0.15em;
            box-sizing: border-box;
            text-decoration:none;
            font-family:'Roboto',sans-serif;
            text-transform:uppercase;
            font-weight:400;
            text-align:center;
            position: absolute;
            right: 7%;
            top: 7%;
            height: 50px;
            width: 150px;
      }
    button {
          padding:0.7em 1.4em;
          margin:0 0.3em 0.3em 0;
          border-radius:0.15em;
          box-sizing: border-box;
          text-decoration:none;
          font-family:'Roboto',sans-serif;
          text-transform:uppercase;
          font-weight:400;
          color:#FFFFFF;
          background-color: green;
          box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
          text-align:center;
          right: 15%;
          top: 15%;
          height: 50px;
          width: 150px;
      }

    .turn-container{
     text-align: center;
     margin-top: 1%;
    }

    td {
        width: 4ex;
        height: 4ex;
        font-size: 200%;
        border: 4px solid transparent;
         display: inline-block;
    }
    tr{
     display: inline-block;
    }

     tr:nth-child(odd) > td:nth-child(odd), tr:nth-child(even) > td:nth-child(even) {
            background-color: white;
        }
      tr:nth-child(odd) > td:nth-child(even), tr:nth-child(even) > td:nth-child(odd) {
            background-color: gray;
      }
</style>

<div>
    {#if finished === 1}
      <ChessModalGameOver {username} {game_id} winner = {turn} host = {host} />
    {:else if finished === 2}
     <ChessModalGameOver {username}  {game_id} winner = {""} host = {host} />
    {/if}
</div>
<div>
    {#if host === username}
        <div class = "button-container">
            <button on:click={StopGame}>Back to Lobby</button>
            <button on:click={() => startNewGame(game_id, username)}>Start New Game</button>
        </div>
    {/if}
    <div class = "turn-container">
        <tr>
            <td id="white-turn"> </td>
            <td id="black-turn"> </td>
        </tr>
    </div>

</div>
    <!--<div class = "grid-container">-->

            <Board
                {board}
                {rows}
                {cols}
                {game_id}
                {username}
                turn = {turn}
                 />

   <!-- </div>-->