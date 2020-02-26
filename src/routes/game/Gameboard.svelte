<script>
    import Table from './Table.svelte';
    import Hand from './Hand.svelte';
    
    export let format = true;
</script>

<!-- Consider grid templating for card layout -->
<h1>Game board</h1>

{#if format}
    <Table/>
{:else}
    <Hand/>
{/if}
