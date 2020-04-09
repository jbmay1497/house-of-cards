<svelte:head>
    <title>Custom</title>
</svelte:head>

<script>
    export let rect = { x: 0, y: 0, w: 100, h: 100 };
    let borders = [];
    let el;
    let oldX;
    let oldY;

    $: transform = `translate(${rect.x}px, ${rect.y}px)`;
    $: style = `transform: ${transform}; width: ${rect.w}px; height: ${rect.h}px; cursor`;

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
        oldX = rect.x;
        oldY = rect.y;
        setState(states.DRAG);
    };

    const handleMouseMove = event => {
        let xOffset = event.clientX - temp.cx;
        let yOffset = event.clientY - temp.cy;
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

    export let value;
    export let suit;
    export const id = 'down:none';
    export let up = false;
    export let pic = "images/face_down.jpg";

    let handleClick = () => {
        if (oldX === rect.x && oldY === rect.y && up) {
            pic = "images/face_down.jpg";
            up = false;
        } else if (oldX === rect.x && oldY === rect.y && !up) {
            pic = `images/${value}_of_${suit}.png`;
            up = true;
        }
    };
</script>

<div bind:this={el} class="rect" style="{style}" on:mousedown={event => handleMouseDown(event)}>
    <img on:click={handleClick} draggable="false" src={pic} alt="card"/>
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
