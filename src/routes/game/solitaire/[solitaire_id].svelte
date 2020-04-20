<style>
    .hidden {
        display: none;
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto 250px;
        height: 100vw;
        width: 100vw;
    }

    .GameBase {
        position: absolute;
        left: 5%;
        top: 5%;
        height: 70vw;
        width: 90vw;
        grid-row: 2;
    }

    .CardRow {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 2em;
    }

    .CardRowGap {
        flex-grow: 2;
    }

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
        position: absolute;
        right: 1%;
        top: 1%;
        height: 45px;
        width: 120px;
    }
</style>

<script context="module">

     export async function preload({ params }, session) {
    //checks if the user enters the lobbies through the /enter route,
    //or through the lobbys url

    //checks if user is in a different lobby, then redirects them there
    if (!session.lobby_id){
         return this.redirect(302, `/`);
    }else if (!session.game || session.game !== "solitaire"){
        return this.redirect(302, `lobbies/${session.lobby_id}`);
    }else if (session.lobby_id !== params.solitaire_id){
        return this.redirect(302, `game/solitaire/${session.lobby_id}`);
    }
    return {game_id: session.lobby_id}

  }
</script>

<script>
    export let game_id;
    import Chat from "../../../components/Chat.svelte";
    import Pile from "./_pile.svelte";
    import ModalGameOver from '../../../components/solitaireGameOver.svelte';
    import {goto} from "@sapper/app"
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    const socket = getContext('socket');
     import { stores } from '@sapper/app';
    const { session } = stores();
     import { get } from 'svelte/store';
     import { onDestroy } from 'svelte';

    let shuffleCards = () => {
        /* Return an array of 52 cards (if jokers is false, 54 otherwise) */
        let cards = [];
        ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
            ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"].forEach(
                    value => {
                        cards.push({ suit: suit, value: value });
                    }
            );
        });
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
        /* Generate and return an initial state for a game */
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

    let state = initialState();

    let move = false;
    let moveCard = {};
    let active = false;
    let gameOver = true;

    let onClick = (event) => {
        let piles = event.detail.piles;
        let location = event.detail.location;

        if(!move && location !== "draw") {
            if (event.detail.id === 'card') {
                let card = event.detail.card;
                let pos = 0;
                moveCard = {};

                for(let i = 0; i < piles.length; i++) {
                    if(piles[i].suit === card.suit && piles[i].value === card.value) {
                        pos = i;
                        break;
                    }
                }

                if(piles[pos].up) {
                    let cards = [];
                    for(let i = pos; i < piles.length; i++) {
                        if(piles[i].up) {
                            let card = {};
                            card["suit"] = piles[i].suit;
                            card["value"] = piles[i].value;
                            cards.push(card);
                        }
                    }
                    moveCard["cards"] = cards;
                    moveCard["src"] = location;
                    move = true;
                }
            }
        } else {
            if(location === "draw") {
                let cards = [];
                let curCard = {};
                if(state.draw.length > 0) {
                    curCard["suit"] = piles[0].suit;
                    curCard["value"] = piles[0].value;
                }
                cards.push(curCard);
                moveCard["cards"] = cards;
                moveCard["src"] = location;
                moveCard["dst"] = "discard";
            } else {
                moveCard["dst"] = location;
            }

            if (!active) {
                validateMove(moveCard);
            } else {
                active = false;
            }

            move = false;
        }
    };

    const validateMove = (move) => {
        let source = move.src;
        let destination = move.dst;
        let card = move.cards[0];

        let pile = state[destination];
        let length = state[destination].length;
        let valid = true;

        if (destination === "draw") {
            valid = false;
        } else if (destination === "discard") {
            if(source !== "draw") {
                valid = false;
            } else if (state[source].length === 0) {
                for(let i = 0; i < length; i++) {
                    let newCards = {};
                    newCards["up"] = false;
                    newCards["suit"] = pile[i].suit;
                    newCards["value"] = pile[i].value;
                    state[source].push(newCards);
                }
                state[destination] = [];
                valid = false;
            }
        } else if ((destination === "stack1" || destination === "stack2" || destination === "stack3" ||
            destination === "stack4")) {
            if(move.cards.length > 1) {
                valid = false;
            }
            if(length === 0) {
                if(card.value !== "ace") {
                    valid = false;
                }
            } else if(pile[0].suit !== card.suit) {
                valid = false;
            } else if(pile[length - 1].value === 10 ||
                pile[length-1].value === "jack" ||
                pile[length-1].value === "queen" ||
                pile[length-1].value === "king" ||
                pile[length-1].value === "ace") {
                if((pile[length-1].value === 10 && card.value !== "jack") ||
                    (pile[length-1].value === "jack" && card.value !== "queen") ||
                    (pile[length-1].value === "queen" && card.value !== "king") ||
                    (pile[length-1].value === "king") ||
                    (pile[length-1].value === "ace" && card.value !== 2)) {
                    valid = false;
                }
            } else {
                let dest = parseInt(pile[length-1].value);
                let src = parseInt(card.value);

                if(src - 1 !== dest) {
                    valid = false;
                }
            }
        } else {
            if(length !== 0) {
                if(pile[length-1].suit === "hearts" ||
                    pile[length-1].suit === "diamonds") {
                    if(card.suit !== "spades" && card.suit !== "clubs") {
                        valid = false;
                    }
                }
                if(pile[length-1].suit === "spades" ||
                    pile[length-1].suit === "clubs") {
                    if(card.suit !== "hearts" && card.suit !== "diamonds") {
                        valid = false;
                    }
                }

                if(pile[length-1].value === "jack" ||
                    pile[length-1].value === "queen" ||
                    pile[length-1].value === "king" ||
                    pile[length-1].value === "ace") {
                    if ((pile[length-1].value === "jack" && card.value !== 10) ||
                        (pile[length-1].value === "queen" && card.value !== "jack") ||
                        (pile[length-1].value === "king" && card.value !== "queen") ||
                        (pile[length-1].value === "ace")) {
                        valid = false;
                    }
                } else {
                    let dest = parseInt(pile[length-1].value);
                    let src = parseInt(card.value);

                    if(src + 1 !== dest) {
                        valid = false;
                    }
                }
            } else {
                if(card.value !== "king") {
                    valid = false;
                }
            }
        }

        if (valid) {
            for(let i = 0; i < move.cards.length; i++) {
                let newCards = {};
                newCards["up"] = true;
                newCards["suit"] = move.cards[i].suit;
                newCards["value"] = move.cards[i].value;
                pile.push(newCards);
            }

            state[destination] = pile;

            if(destination !== "discard") {
                state[source].splice(state[source].length - move.cards.length, move.cards.length);
                if(state[source].length > 0) {
                    state[source][state[source].length - 1].up = true;
                }
            } else {
                state[source].splice(0, 1);
                if (state[source].length === 0) {
                    active = true;
                }
            }

            if (state.stack1.length === 13 &&
                state.stack2.length === 13 &&
                state.stack3.length === 13 &&
                state.stack4.length === 13) {
                gameOver = false;
            }
        }
    };
    let StopGame = () => {
        sendMessage({
        action: 'stopGame',
        game_id: game_id,
        gametype: "solitaire"
        });

    };

    function leaveGame(){

           let session_data = (get(session));
           let s_new = {
                username: session_data.username,
                lobby_id: session_data.lobby_id,
                game: ""
              };
           session.set(s_new);
           sendMessage({
               action: "updateSessionGame",
               gametype: ""
               });
            goto(`lobbies/${session_data.lobby_id}`);
    }

    socket.on('leaveGame', leaveGame);

    onDestroy(() =>{
        socket.off('leaveGame');
    })
</script>

<svelte:head>
    <title>Playing Solitiare</title>
</svelte:head>

<div class="grid-container">
    <div class="GameBase">
        <div class="CardRow">
            <Pile cards={state.stack1} spacing={0} location={"stack1"} on:click={onClick}/>
            <Pile cards={state.stack2} spacing={0} location={"stack2"} on:click={onClick} />
            <Pile cards={state.stack3} spacing={0} location={"stack3"} on:click={onClick} />
            <Pile cards={state.stack4} spacing={0} location={"stack4"} on:click={onClick} />
            <div class="CardRowGap"></div>
            <Pile cards={state.draw} spacing={0} location={"draw"} on:click={onClick} />
            <Pile cards={state.discard} spacing={0} location={"discard"} on:click={onClick} />
        </div>
        <div class="CardRow">
            <Pile cards={state.pile1} location={"pile1"} on:click={onClick} />
            <Pile cards={state.pile2} location={"pile2"} on:click={onClick} />
            <Pile cards={state.pile3} location={"pile3"} on:click={onClick} />
            <Pile cards={state.pile4} location={"pile4"} on:click={onClick} />
            <Pile cards={state.pile5} location={"pile5"} on:click={onClick} />
            <Pile cards={state.pile6} location={"pile6"} on:click={onClick} />
            <Pile cards={state.pile7} location={"pile7"} on:click={onClick} />
        </div>
    </div>
    <div class:hidden ={gameOver}>
        <ModalGameOver {game_id} />
    </div>
</div>
<button on:click={StopGame}>Leave Game</button>
<div class="grid-item">
    <Chat />
</div>
