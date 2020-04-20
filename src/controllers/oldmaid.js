"use strict";

import {buildHands} from "../oldmaid"

export const oldmaid_funcs = app =>({

    createOldMaid: async (game_id, host, usernames) =>{
        let hands = buildHands(usernames.length);
        let done = [];
        for (let i = 0; i < usernames.length; i++) {
            done.push(false);
        }
        let oldmaid_game = {
            _id: game_id,
            usernames: usernames,
            host: host,
            hands: hands,
            done: done,
            allDone: false,
            turn: -1,
            skip: 1,
            numCards: 51,
            gameOver: false
        }

        let oldmaid_data = new app.models.OldMaid(oldmaid_game);
        try {
            await oldmaid_data.save();
            return oldmaid_data;
        }catch(err){
            return {error: "OldMaid game could not be created. Please try again"};
        }
    },

    removeDuplicates: async (game_id, hand, playerIndex, done, allDone, turn) => {
        let game = await app.models.OldMaid.findById(game_id);
        if (!game) {
            return {error: "Game does not exist"};
        }
        game.hands[playerIndex] = hand;
        let numCards = 0;
        for( let i = 0; i < game.hands.length; ++i){
            numCards += game.hands[i].length;
        }
        game.numCards = numCards;
        game.markModified('hands');
        game.done = done;
        game.markModified('done');
        game.allDone = allDone;
        game.turn = turn;
        await game.save();
        return {hand: hand, playerIndex: playerIndex, done: done, allDone: allDone, turn: turn, numCards: numCards}
    },

    moveCard: async(game_id, handTo, handFrom, toIndex, fromIndex, turn, skip) =>{
        let game = await app.models.OldMaid.findById(game_id);
        if (!game) {
            return {error: "Game does not exist"};
        }

        game.numCards -= game.hands[toIndex].length > handTo.length ? 2 : 0;
        game.hands[toIndex] = handTo;
        game.hands[fromIndex] = handFrom;


        game.markModified('hands');
        game.turn = turn;
        game.skip = skip;

        let loser;
        if (game.numCards === 1){
            game.gameOver = true;
            for (let i = 0; i < game.hands.length; ++i){
                if (game.hands[i].length === 1){
                    loser = game.usernames[i];
                }

            }
        }

        await game.save();
        return {handTo: handTo, handFrom: handFrom, toIndex: toIndex, fromIndex:fromIndex, turn: turn, skip: skip,
        numCards: game.numCards, gameOver: game.gameOver, loser: loser};
    },

    stopOldMaid: async(game_id) =>{
        app.models.OldMaid.findByIdAndDelete(game_id, async function(err, deleted_game){
            if (err){
                return { error: `Game could not be deleted` };
            }
            return null;
        })
    },

});
