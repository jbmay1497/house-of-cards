<script>
    export let seat;
    export let rad;
    export let username = "Name";
    export let num = 8;
    export let numPlayer;
    $: offset = 360/num;
    export let hand;

    // TODO: format cards
    // TODO: if not your hand, face down

    $: callPic = (i) => {
        return `images/${hand[i].value}_of_${hand[i].suit}.png`
    };

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let handleClick = (card) => {
        dispatch('click', {
            card: card,
            id: 'card',
            numPlayer: numPlayer
        });
    };

    const dispatchDuplicates = createEventDispatcher();

    let removedDuplicates = false;
    let handleButton = () => {
        dispatchDuplicates('click', {
            id: 'duplicates',
            numPlayer: numPlayer
        });
        removedDuplicates = true;
    };
</script>

<style>
    .container {
        position: absolute;
        width: 300px;
        height: 50px;
    }

    img{
        width: 25%;
        position: relative;
    }

    button {
        color: white;
        border-radius: 4px;
        background-color: green;
    }

    .hidden {
        display: none;
    }
</style>

<div style="transform: rotate({seat * offset}deg) translatey(-{rad}px) rotate({seat * -offset}deg);">
    {username}
    <button class:hidden ={removedDuplicates} on:click={handleButton}>Removed all Duplicates</button>
    <div class="hand">
        <div class="container">
            {#each hand as card, i}
                <img src={callPic(i)} alt="card" on:click={handleClick(card)}/>
            {/each}
        </div>
    </div>
</div>
