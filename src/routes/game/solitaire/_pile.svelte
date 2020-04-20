<style>
    .PileBase {
        margin: 5px;
        position: relative;
        display: inline-block;
        border: dashed 2px #808080;
        border-radius: 5px;
        width: 12%;
    }

    .PileFrame {
        margin-top: 140%;
    }
</style>

<script>
    export let cards;
    export let spacing = 8;
    export let location;
    import Card from "./_card.svelte";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let handleClick = (event) => {
        dispatch('click', {
            location: location,
            piles: cards,
            card: event.detail.card,
            id: 'card'
        });
    };

    const dispatchBase = createEventDispatcher();

    let baseClick = () => {
        if (cards.length === 0) {
            dispatchBase('click', {
                location: location,
                piles: cards,
                id: 'base'
            });
        }
    };
</script>

<svelte:head>
    <title>Pile</title>
</svelte:head>

<div class="PileBase" on:click={baseClick}>
    <div class="PileFrame"></div>
    {#each cards as card, i}
        <Card {card} {spacing} num={i} on:click={handleClick}/>
    {/each}
</div>
