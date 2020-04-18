import { writable } from "svelte/store";
import { get } from "svelte/store";
import { goto } from "@sapper/app";
export const new_board = writable([]);
export const cur_turn = writable("");
export const isFinished = writable(0);

export function updateBoard(updated_game) {
    new_board.set(updated_game.board);
    cur_turn.set(updated_game.turn);
    isFinished.set(updated_game.finished);
}

export function enterNewGame(updated_game){
    new_board.set(updated_game.board);
    cur_turn.set(updated_game.turn);
    isFinished.set(updated_game.finished);
}

export function leaveGame(updated_game){
    new_board.set(updated_game.board);
    cur_turn.set(updated_game.turn);
    isFinished.set(updated_game.finished);
}