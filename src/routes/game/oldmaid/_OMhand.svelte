<style>
    .grid-container {
        display: grid;
        grid-template-rows: 300px auto;
    }

    .hand {
        display: flex;
        flex-direction: row;
    }

    .hand .card {
        width: 120px;
        border-radius: 5px;
    }

    .hand .card:hover {
        transform: scale(1.5);
    }

    button {
        color: white;
        border-radius: 4px;
        background-color: green;
    }
</style>

<script>
    export let hand;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let handleClick = (card) => {
        dispatch('click', {
            card: card,
            id: 'hand'
        });
    };

    const dispatchSort = createEventDispatcher();

    let sort = () => {
        dispatchSort('click', {
            id: 'sort'
        });
    };

    // TODO: format cards to overlap

    $: callPic = (i) => {
        return `images/${hand[i].value}_of_${hand[i].suit}.png`
    }
</script>

<h2>Hand style</h2>
<button on:click={sort}>Sort Cards</button>
<div class="grid-container">
    <div class="grid-item hand">
        {#each hand as card, i}
            <img class="card" src={callPic(i)} alt="card" on:click={handleClick(card)}/>
        {/each}
    </div>
</div>