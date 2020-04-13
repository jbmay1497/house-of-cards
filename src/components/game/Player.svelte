<script>
  export let seat;
  export let rad;
  export let username = "Name";
  export let num = 8;
  $: offset = 360/num;
</script>

<style>
  img{
    width: 100px;
  }
</style>

<div
  style="transform: rotate({seat * offset}deg) translatey(-{rad}px) rotate({seat * -offset}deg);">
  {username}
  <div class="hand">
    <img src="images/face_down.jpg" alt="card"/>
  </div>
</div>
