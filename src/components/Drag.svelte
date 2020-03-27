<svelte:head>
    <title>Custom</title>
</svelte:head>

<script>
    import { onDestroy, onMount } from "svelte";

    export let rect = { x: 0, y: 0, w: 100, h: 100 };
    export let draggable = true;
    export let borderWidth = 0;
    export let snap = 1;
    export let minWidth = 0;
    export let minHeight = 0;
    let borders = [];
    let el;

    $: transform = `translate(${rect.x}px, ${rect.y}px)`;
    $: style = `transform: ${transform}; width: ${rect.w}px; height: ${
            rect.h
    }px; cursor`;

    const states = {
        STATIC: 0,
        DRAG: 2,
        RESIZE_L: 3,
        RESIZE_R: 4,
        RESIZE_T: 5,
        RESIZE_B: 6,
        RESIZE_TL: 7,
        RESIZE_TR: 8,
        RESIZE_BL: 9,
        RESIZE_BR: 10
    };

    let state = states.STATIC;
    let temp = {};

    const generateBorders = () => {
        let rect = el.getBoundingClientRect();
        let bwo = borderWidth / 2;
        borders = [];
        borders.push({
            x: bwo,
            y: -bwo,
            w: rect.w - borderWidth,
            h: borderWidth,
            cursor: "ns-resize",
            mousedownState: states.RESIZE_T
        });
        borders.push({
            x: -bwo,
            y: bwo,
            w: borderWidth,
            h: rect.h - borderWidth,
            cursor: "ew-resize",
            mousedownState: states.RESIZE_L
        });
        borders.push({
            x: bwo,
            y: rect.h - bwo,
            w: rect.w - borderWidth,
            h: borderWidth,
            cursor: "ns-resize",
            mousedownState: states.RESIZE_B
        });
        borders.push({
            x: rect.w - bwo,
            y: bwo,
            w: borderWidth,
            h: rect.h - borderWidth,
            cursor: "ew-resize",
            mousedownState: states.RESIZE_R
        });
        borders.push({
            x: -bwo,
            y: -bwo,
            w: borderWidth,
            h: borderWidth,
            cursor: "nw-resize",
            mousedownState: states.RESIZE_TL
        });
        borders.push({
            x: rect.w - bwo,
            y: -bwo,
            w: borderWidth,
            h: borderWidth,
            cursor: "ne-resize",
            mousedownState: states.RESIZE_TR
        });
        borders.push({
            x: -bwo,
            y: rect.h - bwo,
            w: borderWidth,
            h: borderWidth,
            cursor: "sw-resize",
            mousedownState: states.RESIZE_BL
        });
        borders.push({
            x: rect.w - bwo,
            y: rect.h - bwo,
            w: borderWidth,
            h: borderWidth,
            cursor: "se-resize",
            mousedownState: states.RESIZE_BR
        });
        borders.forEach(b => {
            let transform = `translate(${b.x}px, ${b.y}px)`;
            let style = "";
            style += `transform: ${transform}; `;
            style += `width: ${b.w}px; `;
            style += `height: ${b.h}px; `;
            style += `cursor: ${b.cursor};`;
            b.style = style;
        });
        return borders;
    };

    const setState = newState => {
        state = newState;
        switch (state) {
            case states.DRAG:
            case states.RESIZE_L:
            case states.RESIZE_R:
            case states.RESIZE_T:
            case states.RESIZE_B:
            case states.RESIZE_TL:
            case states.RESIZE_TR:
            case states.RESIZE_BL:
            case states.RESIZE_BR:
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
            case states.RESIZE_L:
                rect.x = Math.min(temp.sx + xOffset, temp.sx + temp.sw - minWidth);
                rect.w = Math.max(temp.sw - xOffset, minWidth);
                break;
            case states.RESIZE_R:
                rect.w = Math.max(temp.sw + xOffset, minWidth);
                break;
            case states.RESIZE_T:
                rect.y = Math.min(temp.sy + yOffset, temp.sy + temp.sh - minHeight);
                rect.h = Math.max(temp.sh - yOffset, minHeight);
                break;
            case states.RESIZE_B:
                rect.h = Math.max(temp.sh + yOffset, minHeight);
                break;
            case states.RESIZE_TL:
                rect.x = Math.min(temp.sx + xOffset, temp.sx + temp.sw - minWidth);
                rect.w = Math.max(temp.sw - xOffset, minWidth);
                rect.y = Math.min(temp.sy + yOffset, temp.sy + temp.sh - minHeight);
                rect.h = Math.max(temp.sh - yOffset, minHeight);
                break;
            case states.RESIZE_TR:
                rect.w = Math.max(temp.sw + xOffset, minWidth);
                rect.y = Math.min(temp.sy + yOffset, temp.sy + temp.sh - minHeight);
                rect.h = Math.max(temp.sh - yOffset, minHeight);
                break;
            case states.RESIZE_BL:
                rect.x = Math.min(temp.sx + xOffset, temp.sx + temp.sw - minWidth);
                rect.w = Math.max(temp.sw - xOffset, minWidth);
                rect.h = Math.max(temp.sh + yOffset, minHeight);
                break;
            case states.RESIZE_BR:
                rect.w = Math.max(temp.sw + xOffset, minWidth);
                rect.h = Math.max(temp.sh + yOffset, minHeight);
                break;
            default:
                break;
        }

        rect.w = Math.max(rect.w, minWidth)
        rect.h = Math.max(rect.h, minHeight)
        generateBorders();
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
</script>

<div bind:this={el} class="rect" style="{style}" on:mousedown={event => handleMouseDown(event)}>
    <img draggable="false" src = 'images/face_down.jpg' alt="face down card"/>
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
