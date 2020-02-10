<script>
    export let format = true;
</script>

<!-- Consider grid templating for card layout -->
<h1>Game board</h1>

{#if format}
    <h2>Table style</h2>
{:else}
    <h2>Hand style</h2>
{/if}
