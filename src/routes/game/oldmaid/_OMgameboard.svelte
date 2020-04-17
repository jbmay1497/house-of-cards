<script>
    import Player from './_OMplayer.svelte';
    import Hand from './_OMhand.svelte';
    import ModalGameOver from '../../../components/ModalGameOver.svelte';

    export let format = true;
    let width;
    export let players;
    export let hands;
    $: turn = -1;
    $: numPlayers = players.length;
    $: diameter = width * 0.9;
    $: radius = (diameter / 2) * 0.9;
    $: smRad = radius * 0.9;

    // TODO: sort cards within their own hand
    // TODO: when they pick a card, it's actually random
    // TODO: be able to erase duplicates even when not their turn
    // TODO: only allow access when it's your deck

    let pair = [];

    let allTrue = (clicked) => {
        return clicked === true;
    };

    let done = [false, false, false, false, false];
    let allDone = false;

    let numCards = 51;
    let pickedCard = false;
    $: skip = 1;
    let gameOver = true;

    let handleClick = (event) => {
        if (event.detail.id === 'duplicates') {
            done[event.detail.numPlayer] = true;
            if (done.every(allTrue)) {
                allDone = true;
                turn = 0;
            }
        } else if(event.detail.id === 'hand' && turn === 0 ||
                done[event.detail.numPlayer] === false ||
                (allDone && turn === event.detail.numPlayer)) {
            if (pair.length === 0) {
                pair.push(event.detail.card);
            } else {
                pair.push(event.detail.card);

                if (pair[0].value === pair[1].value && pair[0].suit !== pair[1].suit) {
                    let person = event.detail.id === 'hand' ? turn : event.detail.numPlayer;
                    hands[person] = hands[person].filter(x => x !== pair[0]);
                    hands[person] = hands[person].filter(x => x !== pair[1]);

                    numCards -= 2;
                    pair = [];

                    if (numCards === 1) {
                        gameOver = false;
                    }

                    if (pickedCard) {
                        let temp = turn;
                        if (hands[temp].length === 0) {
                            skip++;
                            temp--;
                            if (temp < 0) {
                                temp = numPlayers - 1;
                            }
                        }

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
                } else {
                    pair.shift();
                }
            }
       } else if (allDone && (turn === event.detail.numPlayer + skip ||
                 (turn - skip < 0 && event.detail.numPlayer === numPlayers - skip + turn))) {
            hands[event.detail.numPlayer] = hands[event.detail.numPlayer].filter(x => x !== event.detail.card);
            hands[turn] = [...hands[turn], event.detail.card];
            pickedCard = true;

            let duplicate = false;
            for (let i = 0; i < hands[turn].length; i++) {
                if(event.detail.card.value === hands[turn][i].value && event.detail.card.suit !== hands[turn][i].suit) {
                    duplicate = true;
                }
            }

            skip = 1;

            if (!duplicate) {
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
    }
    .table {
        display: block;
        background: #ddd;
        border-radius: 40%;
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
        top: 3%;
    }
    p {
        position: absolute;
        top: 0;
        left: 2%;
    }
</style>

<div class="game-area" bind:clientWidth={width}>
    {#if allDone}
        <p>Current Player's Turn: <b>{players[turn]}</b></p>
        <p class="second">Pick from <b>{turn - skip < 0 ? players[numPlayers - skip + turn] : players[turn - skip]}'s</b> deck</p>
    {:else}
        <p>Remove all duplicates from your hand</p>
    {/if}

    {#if format}
        <div class="table" style="width:{diameter}px; height:{diameter}px;">
            <div class="players" style="transform: translate({radius}px,{radius}px);">
                {#each players as player, i}
                    <div class="player">
                        <Player seat={i} rad={smRad} numPlayer={i} username={player} num={numPlayers}
                                hand={hands[i]} on:click={handleClick}/>
                    </div>
                {/each}
            </div>
        </div>
        <div class:hidden ={gameOver}>
            <ModalGameOver bind:hidden={gameOver}/>
        </div>
    {:else}
        <Hand hand={hands[0]} on:click={handleClick}/>
    {/if}
</div>
