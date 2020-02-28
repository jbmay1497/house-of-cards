<script>
    import Table from './_Table.svelte';
    import Hand from './_Hand.svelte';
    
    export let format = true;
</script>

<!-- Consider grid templating for card layout -->

<style>
    .game-area {
        padding: 0px 5%;
    }
</style>

<div class="game-area">
    {#if format}
        <Table/>
    {:else}
        <Hand/>
    {/if}
</div>
