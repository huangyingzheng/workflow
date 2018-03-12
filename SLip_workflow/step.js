const mongoose = require("mongoose");
const db = require("./../db.js");
const Schema = mongoose.Schema;
const Config = require("./workflow_config");

stepSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    comprises: []
});

Step = mongoose.model("Step", stepSchema);
module.exports = Step;

