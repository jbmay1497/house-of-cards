<style>
    .grid-container {
        display: grid;
        grid-template-columns: auto 250px;
    }
</style>

<script>
    import Chat from "../../../components/Chat.svelte";

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

    let initialState = () => {
        /* Use the above function.  Generate and return an initial state for a game */
        let state = {
            pile1: [],
            pile2: [],
            pile3: [],
            pile4: [],
            pile5: [],
            pile6: [],
            pile7: [],
            stack1: [],
            stack2: [],
            stack3: [],
            stack4: [],
            draw: [],
            discard: []
        };

        // Get the shuffled deck and distribute it to the players
        const deck = shuffleCards(false);
        // Setup the piles
        for (let i = 1; i <= 7; ++i) {
            let card = deck.splice(0, 1)[0];
            card.up = true;
            state[`pile${i}`].push(card);
            for (let j = i + 1; j <= 7; ++j) {
                card = deck.splice(0, 1)[0];
                card.up = false;
                state[`pile${j}`].push(card);
            }
        }
        // Finally, get the draw right
        state.draw = deck.map(card => {
            card.up = false;
            return card;
        });
        return state;
    };

    const validateMove = (move, state) => {
        // Return either error or state of game after a valid move
        let source = move.src;
        let destination = move.dst;
        let card = move.cards[0];

        let pile = state.state[destination];
        let length = state.state[destination].length;
        try {
            if (destination === "draw") {
                return null;
            } else if (destination === "discard") {
                if(source !== "draw") {
                    return null;
                } else if(state.state[source].length === 0) {
                    for(let i = 0; i < length; i++) {
                        let newCards = {};
                        newCards["up"] = false;
                        newCards["suit"] = pile[i].suit;
                        newCards["value"] = pile[i].value;
                        state.state[source].push(newCards);
                    }
                    state.state[destination].splice(0, length);
                    return state.state;
                }
            } else if ((destination === "stack1" || destination === "stack2" || destination === "stack3" ||
                    destination === "stack4")) {
                if(move["cards"].length > 1) {
                    return null;
                }
                if(length === 0) {
                    if(card.value !== "ace") {
                        return null;
                    }
                } else if(pile[0].suit !== card.suit) {
                    return null;
                } else if(pile[length - 1].value === "10" ||
                        pile[length-1].value === "jack" ||
                        pile[length-1].value === "queen" ||
                        pile[length-1].value === "king" ||
                        pile[length-1].value === "ace") {
                    if((pile[length-1].value === "10" && card.value !== "jack") ||
                            (pile[length-1].value === "jack" && card.value !== "queen") ||
                            (pile[length-1].value === "queen" && card.value !== "king") ||
                            (pile[length-1].value === "king") ||
                            (pile[length-1].value === "ace" && card.value !== "2")) {
                        return null;
                    }
                } else {
                    let dest = parseInt(pile[length-1].value);
                    let src = parseInt(card.value);

                    if(src - 1 !== dest) {
                        return null;
                    }
                }
            } else {
                if(length !== 0) {
                    if(pile[length-1].suit === "hearts" ||
                            pile[length-1].suit === "diamonds") {
                        if(card.suit !== "spades" && card.suit !== "clubs") {
                            return null;
                        }
                    }
                    if(pile[length-1].suit === "spades" ||
                            pile[length-1].suit === "clubs") {
                        if(card.suit !== "hearts" && card.suit !== "diamonds") {
                            return null;
                        }
                    }

                    if(pile[length-1].value === "jack" ||
                            pile[length-1].value === "queen" ||
                            pile[length-1].value === "king" ||
                            pile[length-1].value === "ace") {
                        if ((pile[length-1].value === "jack" && card.value !== "10") ||
                                (pile[length-1].value === "queen" && card.value !== "jack") ||
                                (pile[length-1].value === "king" && card.value !== "queen") ||
                                (pile[length-1].value === "ace")) {
                            return null;
                        }
                    } else {
                        let dest = parseInt(pile[length-1].value);
                        let src = parseInt(card.value);

                        if(src + 1 !== dest) {
                            return null;
                        }
                    }
                } else {
                    if(card.value !== "king") {
                        return null;
                    }
                }
            }

            for(let i = 0; i < move.cards.length; i++) {
                let newCards = {};
                newCards["up"] = true;
                newCards["suit"] = move.cards[i].suit;
                newCards["value"] = move.cards[i].value;
                pile.push(newCards);
            }

            if(destination !== "discard") {
                state.state[source].splice(state.state[source].length - move.cards.length, move.cards.length);
                if(state.state[source].length > 0) {
                    state.state[source][state.state[source].length - 1].up = true;
                }
            } else {
                state.state[source].splice(0, 1);
            }

            return state.state;
        }
        catch (err) {
            console.log(err);
        }
    };
</script>

<svelte:head>
    <title>Playing Solitare</title>
</svelte:head>

<div class="grid-container">
    <div class="grid-item">
        <Chat />
    </div>
</div>
