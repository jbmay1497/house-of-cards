"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Chess = new Schema(
    {
        _id: String,
        usernames: [String],
        host: String,
        white: String,
        black: String,
        board: [],
        turn: String

    },
    {_id: false}
);

const chess = mongoose.model("Chess", Chess);
module.exports = chess;