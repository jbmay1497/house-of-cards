<svelte:head>
    <title>Custom</title>
</svelte:head>

<script>
    import { onDestroy, onMount } from "svelte";

    export let rect = { x: 0, y: 0, w: 100, h: 100 };
    export let draggable = true;
    export let snap = 1;
    let borders = [];
    let el;

    $: transform = `translate(${rect.x}px, ${rect.y}px)`;
    $: style = `transform: ${transform}; width: ${rect.w}px; height: ${
            rect.h
    }px; cursor`;

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
                temp.sx = rect.x;
                temp.sy = rect.y;
                temp.sw = rect.w;
                temp.sh = rect.h;
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
        if (draggable) setState(states.DRAG);
    };
    const handleMouseMove = event => {
        let xOffset = event.clientX - temp.cx;
        let yOffset = event.clientY - temp.cy;
        if (snap > 0) {
            xOffset = Math.round(xOffset / snap) * snap;
            yOffset = Math.round(yOffset / snap) * snap;
        }
        temp.ox = xOffset;
        temp.oy = yOffset;


        switch (state) {
            case states.DRAG:
                rect.x = temp.sx + xOffset;
                rect.y = temp.sy + yOffset;
                break;
            default:
                break;
        }
    };
    const handleMouseUp = event => {
        setState(states.STATIC);
    };

    const resizeRight = () => {};

    let _keyDown = [];

    onDestroy(() => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    });

    onMount(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    export let pic = "images/face_down.jpg";
    let up = false;
    let handleClick = (value, suit) => {
        console.log("hi");
        if(!up) {
            pic = "images/2_of_clubs.png";
            up = true;
        } else {
            pic = "images/face_down.jpg";
            up = false;
        }
    };

    // export let Card = ({ card }) => {
    //     const source = card.up
    //             ? `images/${card.value}_of_${card.suit}.png`
    //             : "images/face_down.jpg";
    //     const id = `${card.suit}:${card.value}`;
    // }
</script>

<div bind:this={el} class="rect" style="{style}" on:mousedown={event => handleMouseDown(event)}>
    <img on:click={handleClick('2','hearts')} draggable="false" src={pic} alt="face down card"/>
</div>
<style>
    img {
        position: relative;
        border-radius: 5px;
        height: 10vw;
    }

    div {
        text-align: center;
    }

    .rect {
        background: none;
        position: relative;
        padding: 0;
        user-select: none;
    }
</style>
