<script context="module">
     import { writable } from "svelte/store";
      import { get } from "svelte/store";
      const new_board = writable([]);
      const cur_turn = writable("");

      export function updateBoard(updated_game) {
          new_board.set(updated_game.board);
          cur_turn.set(updated_game.turn);

        }

     export async function preload({ params }, session) {
    //checks if the user enters the lobbies through the /enter route,
    //or through the lobbys url
    //console.log("preload called");
    //console.log(session);

    //checks if user is in a different lobby, then redirects them there
    if (!session.lobby_id){
         return this.redirect(302, `/`);
    }else if (!session.game || session.game !== "chess"){
        return this.redirect(302, `lobbies/${session.lobby_id}`);
    }else if (session.lobby_id !== params.chess_id){
        return this.redirect(302, `game/chess/${session.lobby_id}`);
    }

    //fetching lobbies data
    const res = await this.fetch(`api/games/chess/${params.chess_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const game_data = await res.json();
    if (res.status === 200) {
      game_data.username = session.username;
      return { chess_game: game_data };
    } else {
      this.redirect(302, ``);
    }
  }
</script>

<script>

export let chess_game;
let username = chess_game.username;
let black = chess_game.black;
let white = chess_game.white;
let game_id = chess_game._id;
let board = chess_game.board;
let turn = chess_game.turn;
import Board from "./_Board.svelte";

$new_board = board;
$cur_turn = turn;

let rows = [0, 1, 2, 3, 4, 5, 6, 7];
let cols = [0, 1, 2, 3, 4, 5, 6, 7];

//prob dont need, just have host choose color
if (username === black){
    rows = rows.reverse();
    cols = cols.reverse();
}

</script>

<div>
    <Board
        board={$new_board}
        {rows}
        {cols}
        {game_id}
        {username}
        turn = {$cur_turn}
         />
</div>