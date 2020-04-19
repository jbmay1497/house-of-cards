"use strict";
import {INITIAL_BOARD} from "../chess"
import {TEMP_BOARD} from "../chess"
import {validateMove} from "../chess"
import {checkForEndGame} from "../chess"

export const chess_funcs = app => ({
    createChess: async (game_id, host, usernames) => {
        let chess_game = {
            _id: game_id,
            usernames: usernames,
            host: host,
            white: host,
            black: usernames[1],
            board: INITIAL_BOARD,
            turn: host,
            moveCount: 0,
            moves: [],
            finished: 0

        };
        let chess_data = new app.models.Chess(chess_game);
        try {
            await chess_data.save();
            return chess_data;
        }catch(err){
            return {error: "Chess games could not be created. Please try again"};
        }
    },

    startNewChess: async (game_id, username)=> {
        console.log(game_id);
        let game = await app.models.Chess.findById(game_id);
        if (username !== game.host) {
            return {error: "only host can start new game"};
        }
        game.turn = game.host;
        game.moves = [];
        game.finished = 0;
        game.board = INITIAL_BOARD;
        game.moveCount = 0;
        game.markModified('board');
        game.markModified('turn');
        await game.save();
        return {board: game.board, turn:game.turn, finished: game.finished};
    },

    stopChess: async(game_id) =>{
        app.models.Chess.findByIdAndDelete(game_id, async function(err, deleted_game){
            if (err){
                return { error: `Game could not be deleted` };
            }
            return null;
        })
    },


    makeMove: async(game_id, from, to)=>{
        let game = await app.models.Chess.findById(game_id);
        if (!game){
            return {error: "Game does not exist"};
        }
        //setting cur_turn to a boolean makes it easier to validate moves
        let cur_turn = game.white === game.turn;
        let cur_piece = game.board[from[0]][from[1]];
        let updated;
            [game.board, updated] = validateMove(game.board, from, to, game.moves, cur_turn);

        if (updated){
            game.markModified('board');
            game.turn = game.turn === game.white ? game.black : game.white;
            game.markModified('turn');
            ++game.moveCount;
            game.moves.push({
                piece: cur_piece,
                from: from,
                to: to
            });
            cur_turn = !cur_turn;
            let endGame = checkForEndGame(game.board, cur_turn, game.moves);
            if(endGame){
                if (endGame[1] === "checkmate"){
                    game.finished = 1;
                    game.turn = game.turn === game.white ? game.black : game.white;
                    game.markModified('turn');
                }else if (endGame[1] === "stalemate"){
                   game.finished = 2;
                }

            }
        }
        await game.save();
        return {board: game.board, turn:game.turn, finished: game.finished};
    }

});
