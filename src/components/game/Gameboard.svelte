<script>
    import {fade} from 'svelte/transition';
    
    import Table from './Table.svelte';
    import Hand from './Hand.svelte';
    import TestTable from './TestTable.svelte';
    
    export let format = true;
    let width;
</script>

<!-- Consider grid templating for card layout -->

<style>
    .game-area {
        padding: 5% 5%;
        min-width: 500px;
    }
</style>

<div class="game-area" bind:clientWidth={width}>
    {#if format}
        <TestTable diameter={width*0.9} playerNum={3}/>
    {:else}
        <Hand/>
    {/if}
    
</div>
