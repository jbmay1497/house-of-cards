<style>
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
        z-index: 999;
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        padding: .5rem 1.5rem;
        width: 24rem;
        border-radius: 0.5rem;
        margin-bottom: 5px;
        text-align: center;
    }

    div{
        font-family: "Roboto", serif;
        font-weight:100;
        color:white;
    }

    h1{
        font-family: "Roboto", serif;
        font-weight: 100;
    }

    button:hover {
        background-color: darkgrey;
    }

    button {
        font-family: "Roboto", serif;
        font-weight: 100;
        max-width: 200px;
        min-width: 150px;
        max-height: 2em;
        background: white;
        color: black;
        border: none;
        border-radius: 5px;
        line-height: 2em;
        font-size: 0.8em;
        margin-right: 5px;
    }

    h1 {
        color: white;
    }
</style>

<script>
    export let hidden;

    let returnToGame = ()=>{
        hidden = true;
    };
</script>

<div class="modal">
    <div class="modal-content">
        <h1>Game Rules</h1>
        <p><b>Objective:</b> Get rid of your cards as soon as possible</p>
        <p><b>Setup:</b> One Queen is Removed from the deck</p>
        <p><b>1.</b> Each player removes the duplicates in their hand at the start of the Game</p>
        <p><b>2.</b> After duplicates are removed, each player takes one card from the player to their left</p>
        <p><b>3.</b>If the new card forms a duplicate in the player's hand, the duplicate is removed</p>
        <p><b>4.</b> Once a player is out of cards, they are out of the Game</p>
        <p><b>5.</b> The last player with one of the Queens loses and is the old maid</p>
        <button on:click ={returnToGame}>Go Back</button>
    </div>
</div>