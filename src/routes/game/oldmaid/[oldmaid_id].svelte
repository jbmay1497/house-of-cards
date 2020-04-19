<script context="module">
     export async function preload({ params }, session) {
        //checks if the user enters the lobbies through the /enter route,
        //or through the lobbys url
        //console.log("preload called");
        //console.log(session);
        console.log(session);
        //checks if user is in a different lobby, then redirects them there
        if (!session.lobby_id){
             return this.redirect(302, `/`);
        }else if (!session.game || session.game !== "oldmaid"){
            return this.redirect(302, `lobbies/${session.lobby_id}`);
        }else if (session.lobby_id !== params.oldmaid_id){
            return this.redirect(302, `game/oldmaid/${session.lobby_id}`);
        }

        //fetching lobbies data
        const res = await this.fetch(`api/games/oldmaid/${params.oldmaid_id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const game_data = await res.json();
        if (res.status === 200) {
          game_data.username = session.username;
          return { oldmaid_game: game_data };
        } else {
          this.redirect(302, ``);
        }
      }
</script>

<script>
  import Switch from "../../../components/game/Switch.svelte";
  import Gameboard from "./_OMgameboard.svelte";
  import Chat from "../../../components/Chat.svelte";
   import ModalExplainRules from '../../../components/ModalExplainRules.svelte';
  import {goto} from "@sapper/app";
  import {getContext} from 'svelte';
  const sendMessage = getContext('sendMessage');
  const socket = getContext('socket');
  import { onDestroy } from 'svelte';
   import { stores } from '@sapper/app';
  const { session } = stores();
   import { get } from 'svelte/store';

  export let oldmaid_game;

    let hands = oldmaid_game.hands;
    let host = oldmaid_game.host;
    let curUser = oldmaid_game.username;
    let done = oldmaid_game.done;
    let allDone = oldmaid_game.allDone;
    let game_id = oldmaid_game._id;
    let turn = oldmaid_game.turn;
    let skip= oldmaid_game.skip;
    let dontExplainRules = true;


      let players = oldmaid_game.usernames;
      $: numPlayers = players.length;

  let format = true;

  function showRules(){
      dontExplainRules = false;
  }

  const toggle = () => {
    format = !format;
  };

  let StopGame = () => {
      if (host === curUser){
          sendMessage({
          action: 'stopGame',
          game_id: game_id,
          gametype: "oldmaid"
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
          socket.off('leaveGame');
      })


</script>

<style>
 .hidden {
    display: none;
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto 250px;
  }

  .grid-item {
      position: relative;
      top: 2%;
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
      right: 7%;
      top: 7%;
      height: 50px;
      width: 150px;
  }

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
</style>

<svelte:head>
  <title>Playing</title>
</svelte:head>
<div>
     <div class:hidden ={dontExplainRules}>
       <ModalExplainRules  bind:hidden={dontExplainRules}/>
     </div>
</div>

<div class="grid-container">
  <div class="grid-item">
    <Gameboard {format} {hands} {players} {curUser} {host} {done} {allDone} {game_id} {turn} {skip}/>
  </div>
  <div class="grid-item">
    <Switch on:toggle={() => toggle()} {format} />
    <Chat />
  </div>

     <div class= "button-container">
     {#if host === curUser}
      <button on:click={StopGame}>Back to Lobby</button>
      {/if}
       <button on:click={showRules}>Show Game Rules</button>
      </div>

</div>
