<script>
    export let seat;
    export let rad;
    export let username = "Name";
    export let num = 8;
    export let numPlayer;
    $: offset = 360/num;
    export let hand;
    export let curUser;
    export let playerIndex;

    // TODO: format cards - closer together, when hover make bigger

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
        if (playerIndex === numPlayer) {
            dispatchDuplicates('click', {
                id: 'duplicates',
                numPlayer: numPlayer
            });
            removedDuplicates = true;
        }
    };

    const dispatchSort = createEventDispatcher();

    let sort = () => {
        if (playerIndex === numPlayer) {
            dispatchSort('click', {
                id: 'sort',
                numPlayer: numPlayer
            });
        }
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

    .active {
        color: black;
    }

    .inactive {
        color: lightgray;
    }
</style>

<div style="transform: rotate({seat * offset}deg) translatey(-{rad}px) rotate({seat * -offset}deg);">
    {#if hand.length !== 0}
        <div class="active">
            {username}
            <button class:hidden ={removedDuplicates} on:click={handleButton}>Removed all Duplicates</button>
            <button on:click={sort}>Sort Cards</button>
        </div>
    {:else}
        <div class="inactive">{username}</div>
    {/if}

    <div class="hand">
        <div class="container">
            {#if username === curUser}
                {#each hand as card, i}
                    <img src={callPic(i)} alt="card" on:click={handleClick(card)}/>
                {/each}
            {:else}
                {#each hand as card, i}
                    <img src="images/face_down.jpg" alt="card" on:click={handleClick(card)}/>
                {/each}
            {/if}
        </div>
    </div>
</div>
