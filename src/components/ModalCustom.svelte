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

    input {
        display: block;
        margin : 0.5em auto;
        width: 50%;
        position: relative;
        float: left;
    }

    label {
        float: left;
    }

    h1 {
        color: white;
    }

    .dealCards, .jokers, .numOfDecks {
        display: inline-block;
    }
</style>

<script>
    import {goto} from "@sapper/app"

    export let hidden = false;

    let returnToIndex = ()=>{
        hidden = true;
    };

    let createGame = ()=> {
        goto("game/custom");
    };
</script>

<div class="modal">
    <div class="modal-content">
        <h1>Custom Game</h1>
        <div id = 'error-containerDealCards'></div>
        <div id = 'error-containerDecks'></div>
        <div>
            <div class="dealCards">
                <label for="num">Deal cards: </label>
                <input type="text" name="numCards" id="num">
                OR
                <input type="checkbox" name="evenDistributed" id="even">
                <label for="even">evenly distributed</label>
            </div>
            <br>
            <div class="jokers">
                <label for="joker">Include jokers? </label>
                <input type="checkbox" name="includeJokers" id="joker">
            </div>
            <div class="numOfDecks">
                <label for="decks">Number of decks: </label>
                <input type="text" name="numDecks" id="decks"><br>
            </div>
        </div>
        <br>
        <button on:click ={returnToIndex}>Go Back</button>
        <button on:click ={createGame}>Create</button>
    </div>
</div>