<script>
  import Player from './Player.svelte';
  export let diameter;
  $: radius = (diameter/2)*0.9;

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
    <Player seat={0} rad={radius}/>
    <Player seat={1} rad={radius}/>
    <Player seat={2} rad={radius}/>
    <Player seat={3} rad={radius}/>
    <Player seat={4} rad={radius}/>
    <Player seat={5} rad={radius}/>
    <Player seat={6} rad={radius}/>
    <Player seat={7} rad={radius}/>
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