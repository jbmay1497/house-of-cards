<script>
  export let diameter;
</script>

<style>
  .table {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ddd;
    border-radius: 40%;
  }
  .deg0 {
    color: blue;
  }
</style>

<div class="table" style="width:{diameter}px; height:{diameter}px;">
  <div class="deg0">Player</div>
</div>
<a
  href="https://css-tricks.com/snippets/sass/placing-items-circle/">
  Here's this for how to do arbitrary elements around a circle.
</a>
<a
  href="https://daveceddia.com/svelte-with-sass-in-vscode/">
  And how to get scss in svelte bc the first link uses that.
</a>