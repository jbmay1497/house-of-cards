"use strict";

import Lobby from "../../../models/lobby"

export async function get(req, res, next){

    let lobby = await Lobby.findById(req.params.lobby_id);
    if (lobby) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(lobby));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({error: `The lobby ${req.params.lobby_id} does not exist. Please enter a new lobby`}));
    }
}