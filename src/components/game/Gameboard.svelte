<script>
    import {fade} from 'svelte/transition';
    
    import Table from './Table.svelte';
    import Hand from './Hand.svelte';
    
    export let format = true;
    let width;
    export let players;
    export let hands;

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
        <Table diameter={width*0.9} hands={hands} players={players}/>
    {:else}
        <Hand hand={hands[0]}/>
    {/if}
    
</div>
