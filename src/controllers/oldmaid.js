"use strict";

import {buildHands} from "../oldmaid"

export const oldmaid_funcs = app =>({

    createOldMaid: async (game_id, host, usernames) =>{
        let hands = buildHands(usernames.length);
        let oldmaid_game = {
            _id: game_id,
            usernames: usernames,
            host: host,
            activePlayerCount: usernames.length,
            hands: hands
        }

        let oldmaid_data = new app.models.OldMaid(oldmaid_game);
        try {
            await oldmaid_data.save();
            return oldmaid_data;
        }catch(err){
            return {error: "OldMaid game could not be created. Please try again"};
        }
    }
});
