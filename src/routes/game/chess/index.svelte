<script>
import Board from "./_Board.svelte";
import {INITIAL_BOARD} from "./chess"

let rows = [0, 1, 2, 3, 4, 5, 6, 7];
let cols = [0, 1, 2, 3, 4, 5, 6, 7];

//prob dont need, just have host choose color
const rotateBoard = ()=>{
    rows = rows.reverse();
    cols = cols.reverse();
}
</script>

<div>
    <Board
        board={INITIAL_BOARD}
        {rows}
        {cols}
        {rotateBoard}
         />
</div>