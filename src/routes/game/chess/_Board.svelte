<script>
    import Cell from "./_Cell.svelte"
    import {getContext} from 'svelte';
    const sendMessage = getContext('sendMessage');
    export let board;
    export let rows;
    export let cols;
    export let game_id;

     const ROW_LABELS = ['8', '7', '6', '5', '4', '3', '2', '1'];
     const COL_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

      let col = -1;
      let row = -1;
      let from;
      let to;

      //need to beef up later
      function clickCell(r, c) {

          if (row === r && col === c) {
              row = -1;
              col = -1;
              from = null;
          } else if (board[r][c] !== ' ' && !from) {
              row = r;
              col = c;
              from = [row, col]

          }else{
              to = [r, c];
              makeMove(from, to);
              from = null;
              to = null;
              row = -1;
              col = -1;
          }
      }
      function makeMove(from, to){
          sendMessage({
          action:"makeMove",
          game_id:game_id,
          from:from,
          to:to
          })

      }
</script>

<table>
    <thead>
        <tr>
            <th></th>
            {#each cols as c}
            <th class:selected = {col === c}>{COL_LABELS[c]}</th>
            {/each}
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each rows as r}
        <tr>
            <th class:selected = {row === r}>{ROW_LABELS[r]}</th>
            {#each cols as c}
            <Cell
                value={board[r][c]}
                on:click={() => clickCell(r, c)}
                selected={col === c && row === r}
                />
            {/each}
            <th class:selected = {row === r}>{ROW_LABELS[r]}</th>
        </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th></th>
            {#each cols as c}
            <th class:selected = {col === c}>{COL_LABELS[c]}</th>
            {/each}
            <th></th>
        </tr>
    </tfoot>
</table>

<style>
    table {
        margin: 4ex auto;
    }
    th {
        text-align: center;
        vertical-align: middle;
        padding: 4ex 4ex;
        font-weight: normal;
        color: black;
        border: 4px solid transparent;
    }

    thead th.selected {
        border-top-color: black;

    }
    tfoot th.selected {
        border-bottom-color: black;

    }
    tbody th:first-child.selected {
        border-left-color: black;

    }
    tbody th:last-child.selected {
        border-right-color: black;

    }
</style>