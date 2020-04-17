<script context="module">

     export async function preload({ params }, session) {
    //checks if the user enters the lobbies through the /enter route,
    //or through the lobbys url
    //console.log("preload called");
    //console.log(session);

    //checks if user is in a different lobby, then redirects them there
    if (!session.lobby_id){
         return this.redirect(302, `/`);
    }else if (!session.game || session.game !== "oldmaid"){
        return this.redirect(302, `lobbies/${session.lobby_id}`);
    }else if (session.lobby_id !== params.oldmaid_id){
        return this.redirect(302, `game/chess/${session.lobby_id}`);
    }

    //currently fetch lobby data, will fetch oldmaid data once the logic works
    const res = await this.fetch(`api/lobby/${params.oldmaid_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const lobby_data = await res.json();
    if (res.status === 200) {
        let game_data = {
            usernames: lobby_data.usernames
        }
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

  export let oldmaid_game;

  //current users username
  let username = oldmaid_game.username;

  //list of current usernames
  let usernames = oldmaid_game.usernames;

  console.log(username);
   console.log(usernames);


  let format = true;

  // TODO: get list of actual users

  const toggle = () => {
    format = !format;
  };

  let shuffleCards = () => {
    /* Return an array of 52 cards (if jokers is false, 54 otherwise) */
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
  };

  let deck = shuffleCards();

  let players = ["Annie", "Bob", "Carl", "David", "Ethan"];
  $: numPlayers = players.length;

  let hands = [];
  for (let i = 0; i < players.length; i++) {
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
</script>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto 250px;
  }
</style>

<svelte:head>
  <title>Playing</title>
</svelte:head>

<div class="grid-container">
  <div class="grid-item">
    <Gameboard {format} {hands} {players}/>
  </div>
  <div class="grid-item">
    <Switch on:toggle={() => toggle()} {format} />
    <Chat />
  </div>
</div>
