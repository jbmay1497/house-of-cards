<script>
    import Player from './_OMplayer.svelte';
    import Hand from './_OMhand.svelte';
    import ModalGameOver from '../../../components/ModalGameOver.svelte';

    import {goto} from "@sapper/app";
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    const socket = getContext('socket');
    import { onDestroy } from 'svelte';
     import { stores } from '@sapper/app';
    const { session } = stores();
     import { get } from 'svelte/store';

    export let format = true;
    let width;
    export let players;
    export let hands;
    export let curUser;
    export let host;
    export let game_id;
    export let done;
    export let allDone;
    export let turn;
    export let skip;
    let loser = "";

    $: numPlayers = players.length;

    $: diameter = width * 0.9;
    $: radius = players.length < 4 ? (diameter / 2) * 0.6 : (diameter / 2) * 0.9;
    $: smRad = radius * 0.9;

    let pair = [];

    let allTrue = (clicked) => {
        return clicked;
    };

    let playerIndex;

    for (let i = 0; i < players.length; i++) {
        if (players[i] === curUser) {
            playerIndex = i;
        }
    }

    let numCards = 51;
    let pickedCard = false;

    let gameOver = false;

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
            let tempCard = hands[playerIndex].filter(cardExists => cardExists.suit === deck[i].suit
            && cardExists.value === deck[i].value);
            if (tempCard.length !== 0) {
                temp.push(tempCard[0]);
            }
        }

        return temp;
    };


    //made remove duplicates button automatically remove duplicates
    let removeDuplicates = hand =>{
        let temp = [];
        for (let i = 0; i < hand.length; ++i){
            if(temp.length && temp[temp.length-1].value === hand[i].value){
                temp.pop();
            }
            else{
                temp.push(hand[i]);
            }
        }
        return temp;
    };

    let duplicatesRemoved = updated_game =>{

        hands[updated_game.playerIndex] = updated_game.hand;
        done = updated_game.done;
        allDone = updated_game.allDone;
        turn= updated_game.turn;
        numCards = updated_game.numCards;

    };

    let cardMoved = updated_game => {
        hands[updated_game.toIndex] = updated_game.handTo;
        hands[updated_game.fromIndex] = updated_game.handFrom;
        turn = updated_game.turn;
        skip = updated_game.skip;
        numCards = updated_game.numCards;
        if (updated_game.gameOver){
            loser  = updated_game.loser;
        }
        gameOver = updated_game.gameOver;


    };

    //for when a player removes duplicates
    socket.on('duplicatesRemoved', duplicatesRemoved);
    //for when a player moves a card from one hand to the other
    socket.on('cardMoved', cardMoved);


    hands[playerIndex] = sort();

    let handleClick = (event) => {

        //for sort, at any time
        if (event.detail.id === 'sort') {
            hands[playerIndex] = sort();
            //for starting game after everyone removed their own duplicate
        } else if (event.detail.id === 'duplicates') {
            done[event.detail.numPlayer] = true;
            hands[event.detail.numPlayer] = removeDuplicates(hands[event.detail.numPlayer]);
            allDone = done.every(allTrue);
            turn = allDone ? 0 : -1;
            sendMessage({
            action:"removeDuplicates",
            game_id: game_id,
            hand: hands[event.detail.numPlayer],
            playerIndex: playerIndex,
            done: done,
            allDone: allDone,
            turn: turn
            });
        } else if (allDone && playerIndex === turn && (turn === event.detail.numPlayer + skip ||
                (turn - skip < 0 && event.detail.numPlayer === numPlayers - skip + turn))) {
            let index = Math.floor(Math.random() * hands[event.detail.numPlayer].length);
            let moveCard = hands[event.detail.numPlayer][index];
            hands[turn] = [...hands[turn], moveCard];
             hands[turn] = sort();
            hands[event.detail.numPlayer] = hands[event.detail.numPlayer].filter(x => x !== moveCard);

            let tempMoveTo = removeDuplicates(hands[turn]);
            let originalTurn = turn;

            setTimeout(async ()=>{
                let temp = await removeDuplicates(hands[originalTurn]);
                if (temp.length !== hands[originalTurn].length){
                    numCards -=2;
                }
                hands[originalTurn] = temp;
                if (numCards === 1){
                    loser = curUser;
                    gameOver = true;
                }
            }, 1200);

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

            sendMessage({
                action:"moveCard",
                game_id: game_id,
                handTo: tempMoveTo,
                handFrom:hands[event.detail.numPlayer],
                toIndex: originalTurn,
                fromIndex: event.detail.numPlayer,
                turn: turn,
                skip: skip
            });
        }
    };

    onDestroy(() =>{
        socket.off('duplicatesRemoved');
        socket.off('cardMoved');
    })
</script>

<style>
    .game-area {
        padding: 5% 5%;
        min-width: 500px;
        position: relative;
    }

    .table {
        display: block;
        background:black;
        border-radius: 40%;
        border-style: solid;
        border-color: white;
    }

    .players{
        margin: auto;
        position: absolute;
        top: 10%;
        left: 5%;
    }

    .player{
        position: absolute;
        top: 0;
        left:0;
    }

    .second {
        top: 10%;
    }

    .turn {
        font-family: "Roboto", serif;
        font-weight: 300;
    }

    .message-container{
        position: absolute;
        top: 2%;
        left: 2%;
        color: black;
    }
</style>

<div class="game-area" bind:clientWidth={width}>
    {#if allDone}
        <div class="message-container">
            <div class = "turn">Current Player's Turn: <b>{players[turn]}</b></div>
            <div class="turn second">Pick from <b>{turn - skip < 0 ? players[numPlayers - skip + turn] : players[turn - skip]}'s</b> deck</div>
        </div>
    {:else}
        <div class="message-container">
            <div class = "turn">Remove all duplicates from your hand</div>
        </div>
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
        <div>
            {#if gameOver}
                <ModalGameOver {game_id} {host} username = {curUser} {loser}/>
            {/if}
         </div>

    {:else}
        <Hand hand={hands[playerIndex]} on:click={handleClick}/>
    {/if}

</div>
