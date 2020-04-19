<style>
    img {
        position: absolute;
        height: auto;
        width: 100%;
        border-radius: 3%;
        left: 0;
    }
</style>

<script>
    export let card;
    export let num;
    export let spacing;

    let top = num * spacing;

    $: source = card.up ? `/images/${card.value}_of_${card.suit}.png` : "/images/face_down.jpg";
    let id = `${card.suit}:${card.value}`;

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let handleClick = (card) => {
        dispatch('click', {
            card: card
        });
    }
</script>

<svelte:head>
    <title>Card</title>
</svelte:head>

<div>
    <img alt="card" src={source} id={id} style="top: {top}%" on:click={handleClick(card)}/>
</div>