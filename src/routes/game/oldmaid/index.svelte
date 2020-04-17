<script>
  import Switch from "../../../components/game/Switch.svelte";
  import Gameboard from "./_OMgameboard.svelte";
  import Chat from "../../../components/Chat.svelte";
  let format = true;

  // TODO: get list of actual users
  // TODO: make card piles variable to number of players

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
  let annie = [];
  let bob = [];
  let carl = [];
  let david = [];
  let ethan = [];

  for (let i = 0; i < deck.length; i++) {
    if (i % 5 === 0) {
      annie.push(deck[i]);
    } else if (i % 5 === 1) {
      bob.push(deck[i]);
    } else if (i % 5 === 2) {
      carl.push(deck[i]);
    } else if (i % 5 === 3) {
      david.push(deck[i]);
    } else if (i % 5 === 4) {
      ethan.push(deck[i]);
    }
  }

  hands.push(annie);
  hands.push(bob);
  hands.push(carl);
  hands.push(david);
  hands.push(ethan);
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
