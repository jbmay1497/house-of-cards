<script>
    export let seat;
    export let rad;
</script>

<div style="transform: rotate({seat*45}deg) translate({rad}px) rotate({seat*(-45)}deg);">
    Player
    <button>Sit here!</button>
    <div>Cards</div>
</div>