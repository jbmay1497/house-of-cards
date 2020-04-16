<script>
    import {fade} from 'svelte/transition';
    
    import Table from './Table.svelte';
    import Hand from './Hand.svelte';
    import TestTable from './TestTable.svelte';
    
    export let format = true;
    export let deck;
    let width;

    let players = ["Annie", "Bob", "Carl", "David", "Ethan"];
    $: numPlayers = players.length;

    let hands = [];
    let annie = [];
    let bob = [];
    let carl = [];
    let david = [];
    let ethan = [];

    for (let i = 0; i < deck.length; i++) {
        if (i % 5 === 0) {
            annie.push(deck[i]);
        } else if (i % 5 === 1) {
            bob.push(deck[i]);
        } else if (i % 5 === 2) {
            carl.push(deck[i]);
        } else if (i % 5 === 3) {
            david.push(deck[i]);
        } else if (i % 5 === 4) {
            ethan.push(deck[i]);
        }
    }

    hands.push(annie);
    hands.push(bob);
    hands.push(carl);
    hands.push(david);
    hands.push(ethan);
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
        <TestTable diameter={width*0.9} playerNum={3} hands={hands} players={players}/>
    {:else}
        <Hand hand={annie}/>
    {/if}
    
</div>
