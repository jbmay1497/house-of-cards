<style>
    button {
        padding:0.7em 1.4em;
        margin:0 0.3em 0.3em 0;
        border-radius:0.15em;
        box-sizing: border-box;
        text-decoration:none;
        font-family:'Roboto',sans-serif;
        text-transform:uppercase;
        font-weight:400;
        color:#FFFFFF;
        background-color: green;
        box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
        text-align:center;
        position:relative;
        left: 86%;
        height: 50px;
        width: 150px;
    }

    button:active {
        top:0.1em;
    }

    @media all and (max-width:30em) {
        button {
            display: block;
            margin: 0.4em auto;
        }
    }
</style>

<script context="module">
     export async function preload({ params }, session) {
        //checks if the user enters the lobbies through the /enter route,
        //or through the lobbys url
        return {custom_id: params.custom_id};
    }
</script>

<script>
    import Drag from "../../../components/Drag.svelte";
    import {card_pos} from "./stores.js";
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    export let custom_id;

    let finalDeck = [];

    let initialSetup = (includeJokers = false) =>{
        let index = 0;
        ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
            ["king", "queen", "jack", 10, 9, 8, 7, 6, 5, 4, 3, 2, "ace"].forEach(
                value => {
                    finalDeck.push(
                        {rect: {x: 580, y: 160, w: 0, h: 0},
                        value: value,
                        suit: suit,
                        id: `${suit}:${value}`,
                        index: index++,
                        up: false,
                        pic: "images/face_down.jpg"});
                }
            );
        });

        if (includeJokers) {
            // cards.push({ suit: 'black', value: 'joker'});
            // cards.push({ suit: 'red', value: 'joker'});
        }
    };

    let shuffleCards = (includeJokers = false) => {
       let new_index = 0;
        /* Return an array of 52 cards (if jokers is false, 54 otherwise) */

        let deck = [];
        while ($card_pos.length > 0) {
            // Find a random number between 0 and cards.length - 1
            const index = Math.floor(Math.random() * $card_pos.length);
            $card_pos[index].rect = {x: 580, y: 160, w: 0, h: 0};
            $card_pos[index].up = false;
            $card_pos[index].pic = "images/face_down.jpg";
            $card_pos[index].index = new_index++;
            deck.push($card_pos[index]);
            $card_pos.splice(index, 1);
        }

        $card_pos = deck;
        sendMessage({
        action: "resetDeck",
        game_id: custom_id,
        deck: deck
        })
    };

    let resetDeck = (includeJokers = false) =>{
        finalDeck = [];
        initialSetup();
        $card_pos = finalDeck;
        sendMessage({
        action: "resetDeck",
        game_id: custom_id,
        deck: finalDeck
        })

    };

    initialSetup();
    $card_pos = finalDeck;
</script>

<div>
    <button on:click={resetDeck}>Reset to Unshuffled Deck</button>
</div>

<div>
    <button on:click={shuffleCards}>Reset & <br>Shuffle Deck</button>
</div>

{#each $card_pos as card}
    <Drag {card} {custom_id}/>
{/each}
