<script>
  export let seat;
  export let rad;
  export let username = "Name";
  export let num = 8;
  $: offset = 360/num;

  export let hand;

  let callPic = (i) => {
    return `images/${hand[i].value}_of_${hand[i].suit}.png`
  }
</script>

<style>
  .container {
    position: absolute;
    width: 300px;
    height: 50px;
  }

  img{
    width: 25%;
    position: relative;
  }
</style>

<div
  style="transform: rotate({seat * offset}deg) translatey(-{rad}px) rotate({seat * -offset}deg);">
  {username}
  <div class="hand">
    <div class="container">
      {#each hand as card, i}
        <img src={callPic(i)} alt="card"/>
      {/each}
    </div>
  </div>
</div>
