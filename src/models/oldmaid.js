"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OldMaid = new Schema(
    {
        _id: String,
        usernames: [String],
        host: String,
        activePlayerCount: {type: Number, default: 1},
        hands: []

    },
    {_id: false}
);

const oldmaid = mongoose.model("OldMaid", OldMaid);
module.exports = oldmaid;