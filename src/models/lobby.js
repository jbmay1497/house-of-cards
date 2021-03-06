"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Lobby = new Schema(
    {
        _id: String,
        usernames: [String],
        host: String,
        playerCount: {type: Number, default: 1},
        gameStarted: Boolean

    },
    {_id: false}
);

const lobby = mongoose.model("Lobby", Lobby);
module.exports = lobby;