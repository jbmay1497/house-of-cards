<style>
    .board {
        grid-area: game;
        background-color: antiquewhite;
    }

    .player {
        background-color: burlywood;
    }

    .player-1{
        grid-area: player1;
    }

    .player-2{
        grid-area: player2;
    }
    
    .player-3{
        grid-area: player3;
    }

    .player-4{
        grid-area: player4;
    }

    .player-5{
        grid-area: player5;
    }

    .player-6{
        grid-area: player6;
    }

    .player-7{
        grid-area: player7;
    }

    .player-8{
        grid-area: player8;
    }


    .grid-container {
        display: grid;
        grid-template-rows: 100px 150px 100px 150px 100px;
        grid-template-columns: 100px 150px 100px 150px 100px;
        grid-template-areas: 
            "player1 . player2 . player3"
            ". game game game ."
            "player4 game game game player5"
            ". game game game ."
            "player6 . player7 . player8";
    }
</style>

<div class="grid-container">
    <div class="player player-1">Player 1</div>
    <div class="player player-2">Player 2</div>
    <div class="player player-3">Player 3</div>
    <div class="player player-4">Player 4</div>
    <div class="player player-5">Player 5</div>
    <div class="player player-6">Player 6</div>
    <div class="player player-7">Player 7</div>
    <div class="player player-8">Player 8</div>
    <div class="board">
        <h2>Game board</h2>
    </div>
</div>
<!-- 
    Have separate components for each of the premade games?
    Take in a prop that determines what type of game to play
 -->

 <!--
    Background looks like a table?
    Use grid stuff for creating the areas where people will go, and where the play area is
 -->