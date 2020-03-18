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


<h2>Hand style</h2>

<div class="grid-container">
    <div class="grid-item">
        
    </div>
    <div class="grid-item hand">
        <img class="card" src="images/2_of_clubs.png" alt="2 of clubs" />
        <img class="card" src="images/9_of_hearts.png" alt="9 of hearts" />
        <img class="card" src="images/jack_of_diamonds.png" alt="jack of diamonds" />
        <img class="card" src="images/5_of_spades.png" alt="5 of spades" />
    </div>
</div>