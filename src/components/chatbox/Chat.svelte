<script>
  import Comment from "./_Comment.svelte";
</script>

<style>
  .container {
    display: block;
    min-height: 60%;
    flex-grow: 1;
    background-color: beige;
    padding: 10px;
  }
  .input {
    bottom: 5px;
  }
</style>

<div class="container">
  <Comment />
  <div class="input">
      <input type="text" />
      <button>>></button>
  </div>
</div>
