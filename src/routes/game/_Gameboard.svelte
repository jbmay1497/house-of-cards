<script>
    import Table from './_Table.svelte';
    import Hand from './_Hand.svelte';
    
    export let format = true;
</script>

<!-- Consider grid templating for card layout -->
<h1>Game board</h1>

{#if format}
    <Table/>
{:else}
    <Hand/>
{/if}
