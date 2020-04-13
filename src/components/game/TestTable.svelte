<script>
  import Player from './Player.svelte';
  export let diameter;
  $: radius = (diameter/2)*0.9;

  let players = [0,1,2,3,4,5,6,7];  //figure this out later

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
</style>

<div class="table" style="width:{diameter}px; height:{diameter}px;">
  <div class="players" style="transform: translate({radius}px,{radius}px);">
    {#each players as player}
      <Player seat={player} rad={radius}/>
    {/each}
  </div>
</div>
<a
  href="https://css-tricks.com/snippets/sass/placing-items-circle/">
  Here's this for how to do arbitrary elements around a circle.
</a>
<a
  href="https://daveceddia.com/svelte-with-sass-in-vscode/">
  And how to get scss in svelte bc the first link uses that.
</a>