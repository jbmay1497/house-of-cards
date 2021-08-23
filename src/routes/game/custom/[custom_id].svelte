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

        if (!session.lobby_id){
                 return this.redirect(302, `/`);
            }else if (!session.game || session.game !== "custom"){
                return this.redirect(302, `lobbies/${session.lobby_id}`);
            }else if (session.lobby_id !== params.custom_id){
                return this.redirect(302, `game/custom/${session.lobby_id}`);
            }

        //to get host name
        const res = await this.fetch(`api/lobby/${params.custom_id}`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json"
              }
        });

        const data = await res.json();
        if (res.status === 200) {
            let custom_game =
            {custom_id: params.custom_id,
            username: session.username,
            host: data.host};
            return {custom_game:custom_game};
        }else {
          this.redirect(302, ``);
        }
    }
</script>

<script>
    import Drag from "../../../components/Drag.svelte";
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    const socket = getContext('socket');
    import { onMount } from 'svelte';
     import { stores } from '@sapper/app';
    const { session } = stores();
     import { get } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import {goto} from "@sapper/app"

    export let custom_game;
    let custom_id = custom_game.custom_id;
    let username = custom_game.username;
    let host = custom_game.host;

    let finalDeck = [];
    let xSize;
    let ySize;

    if (typeof window !== 'undefined') {
        xSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        xSize = xSize / 2.2;
        ySize = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
        ySize = ySize / 6;
    }

    let initialSetup = async (includeJokers = false) =>{
        let index = 0;
       await ["spades", "clubs", "hearts", "diamonds"].forEach(suit => {
            ["ace", "king", "queen", "jack", 10, 9, 8, 7, 6, 5, 4, 3, 2].forEach(
                value => {
                    finalDeck.push(
                        {rect: {x: xSize, y: ySize, w: 0, h: 0},
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

    let shuffleCards = async (includeJokers = false) => {
       let new_index = 0;
        /* Return an array of 52 cards (if jokers is false, 54 otherwise) */

        let deck = [];
        while (finalDeck.length > 0) {
            // Find a random number between 0 and cards.length - 1
            const index = await Math.floor(Math.random() * finalDeck.length);
            finalDeck[index].rect = {x: xSize, y: ySize, w: 0, h: 0};
            finalDeck[index].up = false;
            finalDeck[index].pic = "images/face_down.jpg";
            finalDeck[index].index = new_index++;
            await deck.push(finalDeck[index]);
            await finalDeck.splice(index, 1);
        }

        finalDeck = deck;
        sendMessage({
        action: "resetDeck",
        game_id: custom_id,
        deck: deck
        })
    };

    let resetDeck = (includeJokers = false) =>{
        console.log('got to reset deck');
        finalDeck = [];
        initialSetup();
        finalDeck = finalDeck;
        sendMessage({
        action: "resetDeck",
        game_id: custom_id,
        deck: finalDeck
        })
    };


  async function updateCardPos(cur_card) {
      if (cur_card.index !== 51){
          await finalDeck.splice(cur_card.index, 1);
          await finalDeck.push(cur_card)
          for (let i = cur_card.index; i < finalDeck.length; i++){
              finalDeck[i].index =  i;
          }
      }else{
          finalDeck[cur_card.index] = cur_card;
      }
      finalDeck = finalDeck;
  }

  function deckReset(deck){
       finalDeck = deck;
   }
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

  let StopGame = () => {
       if (host === username){
           sendMessage({
           action: 'stopGame',
           game_id: custom_id
           });
       }
  };


   socket.on('leaveGame', leaveGame);
   socket.on('updateCardPos', updateCardPos);
   //socket.on('updateCardOrder', updateCardOrder);
   socket.on('deckReset', deckReset);

    initialSetup();

    onDestroy(()=>{
        socket.off('updateCardPos');
        socket.off('deckReset');
        socket.off('leaveGame');
        socket.off('updateCardOrder');
    })

</script>

<div>
    <button on:click={resetDeck}>Reset to Unshuffled Deck</button>
</div>

<div>
    <button on:click={shuffleCards}>Reset & <br>Shuffle Deck</button>
</div>
{#if username === host}
<div>
    <button on:click={StopGame}>Back to Lobby</button>
</div>
{/if}

{#each finalDeck as card (card.id)}
    <Drag {card} {custom_id}/>
{/each}
