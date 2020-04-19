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
  import {goto} from "@sapper/app"

  export let oldmaid_game;

    let hands = oldmaid_game.hands;
    let host = oldmaid_game.host;
    let curUser = oldmaid_game.username;

      let players = oldmaid_game.usernames;
      $: numPlayers = players.length;

  let format = true;

  const toggle = () => {
    format = !format;
  };

  /*let shuffleCards = () => {
    /Return an array of 52 cards (if jokers is false, 54 otherwise)
    let cards = [];
    ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
      ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king"].forEach(
              value => {
                cards.push({ suit: suit, value: value, id: `${suit}:${value}` });
              }
      );
    });
    // leave out one queen
    cards.push({ suit: 'diamonds', value: 'queen', id: 'diamonds:queen' });
    cards.push({ suit: 'clubs', value: 'queen', id: 'clubs:queen' });
    cards.push({ suit: 'spades', value: 'queen', id: 'spades:queen' });
    // Now shuffle
    let deck = [];
    while (cards.length > 0) {
      // Find a random number between 0 and cards.length - 1
      const index = Math.floor(Math.random() * cards.length);
      deck.push(cards[index]);
      cards.splice(index, 1);
    }
    return deck;
  };*/

  //let deck = shuffleCards();

  //current users username



  /*for (let i = 0; i < players.length; i++) {
    hands[i] = [];
  }

  let cur = 0;
  for (let i = 0; i < deck.length; i++) {
    hands[cur].push(deck[i]);
    cur++;
    if (cur === hands.length) {
      cur = 0;
    }
  }

  let handleLeave = () => {
    goto(`/`);
  }*/
</script>

<style>
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

<div class="grid-container">
  <div class="grid-item">
    <Gameboard {format} {hands} {players} {curUser}/>
  </div>
  <div class="grid-item">
    <Switch on:toggle={() => toggle()} {format} />
    <Chat />
  </div>
  <button>Leave Game</button>
</div>
