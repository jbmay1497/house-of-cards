<script>
    import Table from './_Table.svelte';
    import Hand from './_Hand.svelte';
    
    export let format = true;
</script>

<!-- Consider grid templating for card layout -->

{#if format}
    <Table/>
{:else}
    <Hand/>
{/if}
