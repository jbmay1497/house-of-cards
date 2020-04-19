"use strict";

import OldMaid from "../../../../models/oldmaid"

export async function get(req, res, next){

    let oldmaid_game = await OldMaid.findById(req.params.oldmaid_id);
    if (oldmaid_game) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(oldmaid_game));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({error: `The oldmaid game ${req.params.oldmaid_id} does not exist.`}));
    }
}