<svelte:head>
    <title>lobby</title>
</svelte:head>

<script context="module">
    import { get } from 'svelte/store';
    export function enterChessGame(){
        const { session } = stores();
        let session_data = (get(session));
        let s_new = {
              username: session_data.username,
              lobby_id: session_data.lobby_id,
              game: "chess"
          };
          session.set(s_new);
        goto(`game/chess/${session.lobby_id}`);
    }

     export async function preload({ params }, session) {
    //checks if the user enters the lobbies through the /enter route,
    //or through the lobbys url
    console.log("preload called");
    let joined = !!(session.lobby_id && session.username);

    //checks if user is in a different lobby, then redirects them there
    if (session.lobby_id && session.lobby_id !== params.lobby_id) {
      return this.redirect(302, `lobbies/${session.lobby_id}`);
    }

    //fetching lobbies data
    const res = await this.fetch(`api/lobby/${params.lobby_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (res.status === 200) {
      data.joined = joined;
      data.username = joined ? session.username : "";
      return { lobby: data };
    } else {
      this.redirect(302, ``);
    }
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import Modal from "../../components/Modal.svelte";
  import Players from "../../components/Players.svelte";
  import Chat from "../../components/Chat.svelte";
  import {getContext} from 'svelte';
  const sendMessage = getContext('sendMessage');
  import {new_usernames} from "./stores.js";
  import { stores } from '@sapper/app';
  const { session } = stores();

  //allows us to retrieve the lobbies from the module context

  export let lobby;

  let lobby_id = lobby._id;
  let usernames = lobby.usernames;
  let joined = lobby.joined;
  let username = lobby.username;
  let host = lobby.host;

  //set initial values for new_usernames,
  //so they are not set to default values
  $new_usernames = usernames;

  //handles joined event from the modal
  const Joined = event => {
    joined = event.detail.joined;
    username = event.detail.username;
  };

  function handleCardClick() {
    goto("games/custom");
  }

  function copyCode (){
      const copyText = document.createElement('textarea');
      copyText.value = lobby_id;
      copyText.setAttribute('readonly', '');
      copyText.style.position = 'absolute';
      copyText.style.left = '-9999px';
      document.body.appendChild(copyText);
      copyText.select();
      document.execCommand('copy');

      let tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copied: " + lobby_id;

      document.body.removeChild(copyText);
  }

  function createGame(gametype){
      if (gametype === 'oldmaid'){
          goto("games/oldmaid")
      }else if (gametype === 'chess'){
          sendMessage({
            action: "createChess",
            game_id: lobby_id,
            host: host,
            usernames: $new_usernames
          });
          goto(`game/chess/${lobby_id}`)
      }
  }

  function leaveLobby(){
      sendMessage({
        action: "leaveLobby",
        username: username,
        lobby_id: lobby_id,
        exitLobby: exitLobby
      });
  }

  function exitLobby(lobby){
      if (!lobby || !lobby.error){
          let s_new = {
              username: '',
              lobby_id: ''
          };
          session.set(s_new);
          goto(`/`);
      }//do we need an else?
  }


</script>

<style>
  .hidden {
    display: none;
  }

   h1 {
   font-family: 'Roboto', serif;
    padding: 1vw;
    color: white;
    font-size: 60px;
    font-weight: 100;
  }

  div{
  font-family: 'Roboto', serif;
  font-weight: 100;
  color: white;
  }


  p {
    margin: 2vw 0vw 1vw 0vw;
    color: white;
  }

  .dropbtn {
    background-color: black;
    color: white;
    padding: 2vw;
    font-size: 20px;
    font-family: 'Roboto', serif;
    font-weight: 100;
    border: none;
    border-radius: 20px;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    right: 15%;
    display: inline-block;
  }

  .custom {
    position: relative;
    left: 15%;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    position: absolute;
    display: none;
    background-color: #f1f1f1;
    max-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 99;
  }

  /* Links inside the dropdown */
  .dropdown-content .game-type {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content .game-type:hover {
    background-color: #ddd;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: darkgrey;
  }

  img {
    width: 15%;
    position: relative;
    padding: 1em;
    border-radius: 25px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 200px auto 200px;
  }

  .main-stuff {
    text-align: center;
  }

  .player-info {
    display: block;
  }

  #copyBtn {
      font-family: "Roboto", serif;
      font-weight: 100;
      max-height: 2em;
      background: black;
      color: white;
      border: none;
      border-radius: 5px;
      line-height: 2em;
      font-size: 0.8em;
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    top: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #555 transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }

  .leaveBtn {
          font-family: "Roboto", serif;
          font-weight: 100;
          min-width: 15em;
          max-height: 2em;
          background: black;
          color: white;
          border: none;
          border-radius: 5px;
          line-height: 2em;
          font-size: 0.8em;
           margin: 0.25rem;
      }


</style>

<body>
  <div class:hidden={joined}>
    <Modal on:join={Joined} {lobby_id}  />
  </div>

  <div class = "{!joined ? 'hidden' : 'grid-container'}" >
    <div class="player-info">
      <Players usernames = {$new_usernames} {host} />
      <button class = "leaveBtn" on:click = {leaveLobby}>Leave Lobby</button>
    </div>

    <div class="main-stuff">
      <h1>Game Lobby</h1>
      <div>Welcome, {username}!</div>
      <div> Lobby Code: </div>
      <div>{lobby_id}
          <div class = "tooltip">
              <button id = 'copyBtn' on:click ={copyCode}>
                    <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
              Copy Code</button>
           </div>
      </div>

      <div >
        <div class="dropdown">
          <button class="dropbtn">Existing Games</button>
          <div class="dropdown-content">
            <div class = "game-type" on:click = {()=> createGame("oldmaid")}>Old Maid</div>
            <a  class = "game-type" href="game">Solitaire</a>
            <div class = "game-type" on:click = {()=> createGame("chess")}>Chess</div>
          </div>
        </div>

        <div class="custom">
          <button class="dropbtn">Custom Game</button>
        </div>

        <p>Or click below to play with a virtual card deck!</p>
        <figure>
          <img
            on:click={handleCardClick}
            src="images/face_down.jpg"
            alt="face down card" />
        </figure>
      </div>
    </div>

    <div>
        <Chat />
    </div>
  </div>

</body>
