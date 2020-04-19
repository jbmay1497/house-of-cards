<script context="module">


/*export function leaveGame(){
      const { session } = stores();
      const sendMessage = getContext('sendMessage');
      let session_data = (get(session));
       let s_new = {
            username: session_data.username,
            lobby_id: session_data.lobby_id,
            game: ""
          };
       session.set(s_new);
       console.log(get(session));
       sendMessage({
           action: "updateSessionGame",
           gametype: ""
           });
        goto(`lobbies/${session_data.lobby_id}`);
}*/

     export async function preload({ params }, session) {
    //checks if the user enters the lobbies through the /enter route,
    //or through the lobbys url
    //console.log("preload called");
    //console.log(session);
    console.log(session);
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
import {goto} from "@sapper/app"
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
    }


    socket.on('updateGame', updateGame);


    let StopGame = () => {
        if (host === username){
            sendMessage({
            action: 'stopGame',
            game_id: game_id
            });
        }
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
        position: absolute;
        right: 2%;
        top: 0;
        height: 50px;
        width: 150px;
    }
</style>

<div class:hidden ={finished}>
        {#if finished === 1}
          <ChessModalGameOver {username} {game_id} winner = {turn} host = {host} bind:hidden={finished}/>
        {:else if finished === 2}
         <ChessModalGameOver {username}  {game_id} winner = {""} host = {host} bind:hidden={finished}/>
        {/if}
</div>
<div>
    <Board
        {board}
        {rows}
        {cols}
        {game_id}
        {username}
        turn = {turn}
         />
    {#if host === username}
    <button on:click={StopGame}>Stop Game</button>
    {/if}
</div>