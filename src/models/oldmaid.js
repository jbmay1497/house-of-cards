"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OldMaid = new Schema(
    {
        _id: String,
        usernames: [String],
        host: String,
        hands: [],
        done: [],
        allDone: Boolean,
        turn: Number,
        skip: Number,
        numCards: Number,
        gameOver: Boolean

    },
    {_id: false}
);

const oldmaid = mongoose.model("OldMaid", OldMaid);
module.exports = oldmaid;