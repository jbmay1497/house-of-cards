<script>
  import Player from './Player.svelte';
  export let diameter;
  $: radius = (diameter/2) * 0.9;
  $: smRad = radius * 0.9;
  export let hands;

  //let players = ["Annie", "Bob", "Carl", "David", "Ethan", "Fred", "George", "Henry"];  //figure this out later
  export let players;
  $: numPlayers = players.length;
</script>

<style>
  .table {
    display: block;
    background: #ddd;
    border-radius: 40%;
  }
  .players{
    margin: auto;
  }
  .player{
    position: absolute;
    top: 0;
    left:0;
  }
</style>

<div class="table" style="width:{diameter}px; height:{diameter}px;">
  <div class="players" style="transform: translate({radius}px,{radius}px);">
    {#each players as player, i}
      <div class="player">
        <Player seat={i} rad={smRad} username={player} num={numPlayers} hand={hands[i]}/>
      </div>
    {/each}
  </div>
</div>
