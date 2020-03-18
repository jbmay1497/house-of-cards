<script>
  import Switch from "../../components/game/Switch.svelte";
  import Gameboard from "../../components/game/Gameboard.svelte";
  import Chat from "../../components/chatbox/Chat.svelte";

  let format = true;

  const toggle = () => {
    format = !format;
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
    <Gameboard {format} />
  </div>
  <div class="grid-item">
    <Switch on:toggle={() => toggle()} {format} />
    <Chat />
  </div>
</div>
