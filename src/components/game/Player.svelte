<script>
  export let seat;
  export let rad;

  let seated = false;
  const sit = () => {
    seated = true;
  };
  //once a player is seated, somehow send that back to the table so that all the other "sit here" buttons disappear
</script>

<div
  style="transform: rotate({seat * 45}deg) translate({rad}px) rotate({seat * -45}deg);">
  Player {seat}
  {#if !seated}
    <button on:click={() => sit()}>Sit here!</button>
  {:else}
    <div>Cards</div>
  {/if}
</div>
