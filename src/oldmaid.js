let shuffleCards = () => {
    /* Return an array of 52 cards (if jokers is false, 54 otherwise) */
    let cards = [];
    ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
        ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "king"].forEach(
            value => {
                cards.push({ suit: suit, value: value, id: `${suit}:${value}` });
            }
        );
    });
    // leave out one queen
    cards.push({ suit: 'diamonds', value: 'queen', id: 'diamonds:queen' });
    cards.push({ suit: 'clubs', value: 'queen', id: 'clubs:queen' });
    cards.push({ suit: 'spades', value: 'queen', id: 'spades:queen' });
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

export let buildHands = playerCount =>{
    let deck = shuffleCards();
    let hands = [];
    for (let i = 0; i < playerCount; i++) {
        hands[i] = [];
    }

    let cur = 0;
    for (let i = 0; i < deck.length; i++) {
        hands[cur].push(deck[i]);
        cur++;
        if (cur === hands.length) {
            cur = 0;
        }
    }

    return hands;
};