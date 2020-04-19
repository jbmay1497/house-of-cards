<script>
    import Player from './_OMplayer.svelte';
    import Hand from './_OMhand.svelte';
    import ModalGameOver from '../../../components/ModalGameOver.svelte';

    export let format = true;
    let width;
    export let players;
    export let hands;
    export let curUser;

    $: turn = -1;
    $: numPlayers = players.length;
    $: diameter = width * 0.9;
    $: radius = (diameter / 2) * 0.9;
    $: smRad = radius * 0.9;

    let pair = [];

    let allTrue = (clicked) => {
        return clicked === true;
    };

    let done = [];
    let playerIndex;

    for (let i = 0; i < players.length; i++) {
        if (players[i] === curUser) {
            playerIndex = i;
        }
        done.push(false);
    }
    let allDone = false;

    let numCards = 51;
    let pickedCard = false;
    $: skip = 1;
    let gameOver = true;

    let sorted = () => {
        let sortedDeck = [];
        [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"].forEach(value => {
            ["diamonds", "hearts", "clubs", "spades"].forEach(
                    suit => {
                        sortedDeck.push({suit: suit, value: value, id: `${suit}:${value}`});
                    }
            );
        });
        return sortedDeck;
    };

    let sort = () => {
        let deck = sorted();
        let temp = [];

        for (let i = 0; i < deck.length; i ++) {
            let tempCard = hands[playerIndex].filter(cardExists => cardExists.suit === deck[i].suit && cardExists.value === deck[i].value);
            if (tempCard.length !== 0) {
                temp.push(tempCard[0]);
            }
        }

        return temp;
    };

    let handleClick = (event) => {
        if (event.detail.id === 'sort') {
            hands[playerIndex] = sort();
        } else if (event.detail.id === 'duplicates') {
            done[event.detail.numPlayer] = true;
            if (done.every(allTrue)) {
                allDone = true;
                turn = 0;
            }
        } else if(event.detail.id === 'hand' || event.detail.numPlayer === playerIndex) {
            if (pair.length === 0) {
                pair.push(event.detail.card);
            } else {
                pair.push(event.detail.card);

                if (pair[0].value === pair[1].value && pair[0].suit !== pair[1].suit) {
                    hands[playerIndex] = hands[playerIndex].filter(x => x !== pair[0]);
                    hands[playerIndex] = hands[playerIndex].filter(x => x !== pair[1]);

                    numCards -= 2;
                    pair = [];

                    if (numCards === 1) {
                        gameOver = false;
                    }
                } else {
                    pair.shift();
                }
            }
       } else if (allDone && playerIndex === turn && (turn === event.detail.numPlayer + skip ||
                 (turn - skip < 0 && event.detail.numPlayer === numPlayers - skip + turn))) {
            let index = Math.floor(Math.random() * hands[event.detail.numPlayer].length);
            let moveCard = hands[event.detail.numPlayer][index];
            hands[turn] = [...hands[turn], moveCard];
            hands[event.detail.numPlayer] = hands[event.detail.numPlayer].filter(x => x !== moveCard);

            skip = 1;

            turn++;
            if(turn === numPlayers) {
                turn = 0;
            }

            while(hands[turn].length === 0) {
                turn++;
                if(turn === numPlayers) {
                    turn = 0;
                }
                skip++;
            }
        }
    };
</script>

<style>
    .hidden {
        display: none;
    }
    .game-area {
        padding: 5% 5%;
        min-width: 500px;
        position: relative;
        left: 2%;
    }
    .table {
        display: block;
        background: linear-gradient(to right, #A37C4D 0%, #FFE4C4 25%, #FFE4C4 75%, #A37C4D 100%);
        border-radius: 40%;
        border-style: solid;
        border-color: #A37C4D;
    }
    .players{
        margin: auto;
    }
    .player{
        position: absolute;
        top: 0;
        left:0;
    }
    .second {
        top: 4%;
    }

    h3 {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

<div class="game-area" bind:clientWidth={width}>
    {#if allDone}
        <h3>Current Player's Turn: <b>{players[turn]}</b></h3>
        <h3 class="second">Pick from <b>{turn - skip < 0 ? players[numPlayers - skip + turn] : players[turn - skip]}'s</b> deck</h3>
    {:else}
        <h3><b>Remove all duplicates from your hand</b></h3>
    {/if}

    {#if format}
        <div class="table" style="width:{diameter}px; height:{diameter}px;">
            <div class="players" style="transform: translate({radius}px,{radius}px);">
                {#each players as player, i}
                    <div class="player">
                        <Player seat={i} rad={smRad} numPlayer={i} username={player} num={numPlayers}
                            {playerIndex} {curUser} hand={hands[i]} on:click={handleClick}/>
                    </div>
                {/each}
            </div>
        </div>
        <div class:hidden ={gameOver}>
            <ModalGameOver bind:hidden={gameOver}/>
        </div>
    {:else}
        <Hand hand={hands[playerIndex]} on:click={handleClick}/>
    {/if}
</div>
