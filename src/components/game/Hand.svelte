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
</style>

<script>
    export let hand;

    let callPic = (i) => {
        return `images/${hand[i].value}_of_${hand[i].suit}.png`
    }
</script>

<h2>Hand style</h2>

<div class="grid-container">
    <div class="grid-item">
        
    </div>
    <div class="grid-item hand">
        {#each hand as card, i}
            <img class="card" src={callPic(i)} alt="card"/>
        {/each}
    </div>
</div>