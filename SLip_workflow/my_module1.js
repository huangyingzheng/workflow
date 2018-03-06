const db = require("./../db.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Config = require("./workflow_config");
const Alert_model = require("./alert");
const User = require("./user.js");
const Habilitation = require("./habilitation.js");

function saveAlert(date) {
    alert1 = new Alert_model({
        _id: new mongoose.Types.ObjectId(),
        step: "empty",
        order: 0,
        date: date
    });
    const promise = alert1.save();
    return promise;
}

function findAlert(id) {
    const query = Alert_model.findOne({ _id: id });
    return query.exec();
}

async function authenticate(user, order) {
    try {
        const result = await Habilitation.findOne({ users_id: user }).exec();
        console.log(result);
        const result1 = await Config.findOne({ hab_id: result._id }).exec();
        const f = function() {
            if (result1.order === order) {
                return true;
            } else {
                return false;
            }
        };
        return f();
    } catch (err) {
        console.log("err");
    }
}

function beExecute(id, user, judgement) {
    const start = async function() {
        try {
            const alert = await findAlert(id);
            console.log(alert.order);
            let order = alert.order;
            const boolean = await authenticate(user, order);
            console.log(typeof boolean);

            if (alert.id) {
                if (boolean === true && judgement === "agree") {
                    Alert_model.update(
                        { _id: alert.id },
                        {
                            $set: {
                                step: "pending",
                                order: alert.order + 1
                            }
                        }
                    ).exec();
                }
            } else {
                new Error("id invalid");
            }
            console.log("successful");
        } catch (err) {
            console.log(err);
        }
    };
    console.log(start());
}
module.exports = { saveAlert, beExecute };
