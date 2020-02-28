<script>
  import CommentBox from "./_CommentBox.svelte";
</script>

<style>
  .container {
    display: block;
    position: absolute;
    height: 30em;
    flex-grow: 1;
    background-color: beige;
    margin-right: 1em;
  }
  .input {
    position: absolute;
    padding: 10px;
    bottom: 0px;
    border-top: 3px solid gray;
  }
</style>

<div class="container">
  <CommentBox />
  <div class="input">
    <input type="text" />
    <button>>></button>
  </div>
</div>
