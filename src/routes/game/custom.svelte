<script>
    import Draggable from "../../components/Drag.svelte";

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

    let objects = [
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true,
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        },
        {
            rect: {
                x: 560,
                y: 200,
                w: 0,
                h: 0
            },
            draggable: true
        }
    ];
</script>

{#each objects as obj}
    <Draggable {...obj}>{obj.text}</Draggable>
{/each}