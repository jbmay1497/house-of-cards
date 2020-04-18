"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Move = new Schema(
    {
            piece: String,
            from: [],
            to: []
    },
    { _id: false }
);


let Chess = new Schema(
    {
        _id: String,
        usernames: [String],
        host: String,
        white: String,
        black: String,
        board: [],
        turn: String,
        moveCount: { type: Number, default: 0 },
        moves: [Move],
        finished: Number

    },
    {_id: false}
);

const chess = mongoose.model("Chess", Chess);
module.exports = chess;