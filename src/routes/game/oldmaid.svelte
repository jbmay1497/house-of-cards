<script>
  import Switch from "../../components/game/Switch.svelte";
  import Gameboard from "../../components/game/Gameboard.svelte";
  import Chat from "../../components/Chat.svelte";
  let format = true;

  const toggle = () => {
    format = !format;
  };

  let players = ["Annie", "Bob", "Carl", "David", "Ethan"];
  $: numPlayers = players.length;

  let shuffleCards = () => {
    /* Return an array of 52 cards (if jokers is false, 54 otherwise) */
    let cards = [];
    ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
      ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"].forEach(
              value => {
                cards.push({ suit: suit, value: value });
              }
      );
    });
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
    <Gameboard {format} deck={shuffleCards()} />
  </div>
  <div class="grid-item">
    <Switch on:toggle={() => toggle()} {format} />
    <Chat />
  </div>
</div>
