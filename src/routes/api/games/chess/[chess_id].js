"use strict";

import Chess from "../../../../models/chess"

export async function get(req, res, next){

    let chess_game = await Chess.findById(req.params.chess_id);
    if (chess_game) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(chess_game));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({error: `The chess game ${req.params.chess_id} does not exist.`}));
    }
}