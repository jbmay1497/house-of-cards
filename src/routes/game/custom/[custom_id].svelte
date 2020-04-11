<style>
    button {
        display:inline-block;
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
        left: 87%;
        height: 50px;
        width: 130px;
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

<script>
    import Draggable from "../../components/Drag.svelte";

    let finalDeck = [];

    let shuffleCards = (includeJokers = false) => {
        /* Return an array of 52 cards (if jokers is false, 54 otherwise) */
        let cards = [];
        ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
            ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"].forEach(
                    value => {
                        cards.push({ suit: suit, value: value });
                    }
            );
        });
        // Add in jokers here
        if (includeJokers) {
            // cards.push({ suit: 'black', value: 'joker'});
            // cards.push({ suit: 'red', value: 'joker'});
        }
        // Now shuffle
        let deck = [];
        while (cards.length > 0) {
            // Find a random number between 0 and cards.length - 1
            const index = Math.floor(Math.random() * cards.length);
            deck.push(cards[index]);
            cards.splice(index, 1);
        }

        finalDeck = [];

        for (let i = 0; i < 52; i++) {
            finalDeck.push({rect: {x: 580, y: 160, w: 0, h: 0},
                value: deck[i].value,
                suit: deck[i].suit,
                id: `${deck[i].suit}:${deck[i].value}`,
                up: false,
                pic: "images/face_down.jpg"});
        }
    };

    shuffleCards();
</script>

<button on:click={shuffleCards}>Shuffle & <br>Reset Deck</button>

{#each finalDeck as obj}
    <Draggable {...obj}/>
{/each}
