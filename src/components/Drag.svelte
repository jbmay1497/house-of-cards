<svelte:head>
    <title>Custom</title>
</svelte:head>

<script>
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');

    export let card;
    export let custom_id;
    //let rect = card.rect;
    let borders = [];
    let el;
    let oldX;
    let oldY;

    $: transform = `translate(${card.rect.x}px, ${card.rect.y}px)`;
    $: style = `transform: ${transform}; width: ${card.rect.w}px; height: ${card.rect.h}px; z-index: 0; cursor`;

    const states = {
        STATIC: 0,
        DRAG: 2
    };

    let state = states.STATIC;
    let temp = {};

    const setState = newState => {
        state = newState;
        switch (state) {
            case states.DRAG:
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
                temp.sx = card.rect.x;
                temp.sy = card.rect.y;
                temp.sw = card.rect.w;
                temp.sh = card.rect.h;
                temp.cx = event.clientX;
                temp.cy = event.clientY;
                temp.r = temp.sh / temp.sw;
                break;

            default:
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                temp = {};
                break;
        }
    };



    const handleMouseDown = event => {
        oldX = card.rect.x;
        oldY = card.rect.y;
        setState(states.DRAG);
    };

    const handleMouseMove = event => {
        let xOffset = event.clientX - temp.cx;
        let yOffset = event.clientY - temp.cy;
        temp.ox = xOffset;
        temp.oy = yOffset;

        switch (state) {
            case states.DRAG:
                card.rect.x = temp.sx + xOffset;
                card.rect.y = temp.sy + yOffset;
                sendMessage({
                action: "customCardUpdate",
                game_id: custom_id,
                cur_card:card
                });
                break;
            default:
                break;
        }
    };
    const handleMouseUp = event => {
        setState(states.STATIC);
    };

    /*export let value;
    export let suit;
    export let id;
    export let up;
    export let pic;
    */

    let handleClick = () => {
        console.log(card.index);
        if (oldX === card.rect.x && oldY === card.rect.y && card.up) {
            card.pic = "images/face_down.jpg";
            card.up = false;
        } else if (oldX === card.rect.x && oldY === card.rect.y && !card.up) {
            card.pic = `images/${card.value}_of_${card.suit}.png`;
            card.up = true;
        }
        sendMessage({
        action: "customCardUpdate",
        game_id: custom_id,
        cur_card:card
        });

    };
</script>

<div bind:this={el} class="rect" id ="cur-card" style="{style}" on:mousedown={event => handleMouseDown(event)}>
    <img on:click={handleClick} draggable="false" src={card.pic} alt="card"/>
</div>

<style>
    img {

        border-radius: 5px;
        height: 10vw;

    }

    div {
     position: relative;
     text-align: center;
    }

    .rect {
        background: none;
        position: relative;
        padding: 0;
        user-select: none;
    }
</style>
