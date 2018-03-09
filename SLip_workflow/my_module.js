const db = require("./../db.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Config = require("./workflow_config");
const Alert_model = require("./alert");
const assert = require("assert");
// const User = require("./user.js");
const Habilitation = require("./habilitation.js");

function save() {
    config = new Config({
        _id: new mongoose.Types.ObjectId(),
        profile: "manager",
        order: "1"
    });
    const promise = config.save();
    assert.ok(promise instanceof Promise);
    return promise;
}
// save()
//     .then(val => {
//         console.log(val._id);
//     })
//     .catch(error => {
//         console.log("error");
//     });

function find() {
    const query = Habilitation.findOne({ _id: 1 });
    const promise = query.exec();
    console.log(typeof promise);
}
// find();
