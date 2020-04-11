"use strict";
import {INITIAL_BOARD} from "../chess"

export const chess_funcs = app => ({
    createChess: async (game_id, host, usernames) => {
        let chess_game = {
            _id: game_id,
            usernames: usernames,
            host: host,
            white: host,
            black: usernames[1],
            board: INITIAL_BOARD,
            turn: "white"
        };
        let chess_data = new app.models.Chess(chess_game);
        try {
            await chess_data.save();
            return chess_data;
        }catch(err){
            return {error: "Chess games could not be created. Please try again"};
        }
    },

    makeMove: async(game_id, from, to)=>{
        let game = await app.models.Chess.findById(game_id);
        if (!game){
            return {error: "Game does not exist"};
        }
        let cur_piece = game.board[from[0]][from[1]];
        console.log(from);
        console.log(to);
        console.log(cur_piece);
        game.board[from[0]][from[1]] = ' ';
        game.board[to[0]][to[1]] = cur_piece;
        game.markModified('board');
        await game.save();
        return game.board;
    }

});
