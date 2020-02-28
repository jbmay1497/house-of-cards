<svelte:head>
    <title>Custom</title>
</svelte:head>

<style>
    body {
        height: 100%;
        background: linear-gradient(to right, black, seagreen, black);
    }

    img {
        width: 15%;
        position: relative;
        padding: 1em;
    }
</style>

<script>
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
            /*...*/
        }
        // Now shuffle
        let deck = [];
        while (cards.length > 0) {
            // Find a random number between 0 and cards.length - 1
            const index = Math.floor(Math.random() * cards.length);
            deck.push(cards[index]);
            cards.splice(index, 1);
        }
        return deck;
    };
</script>

<body class="container">
    <figure>
        <img src = 'images/face_down.jpg' alt="face down card"/>
    </figure>
</body>
