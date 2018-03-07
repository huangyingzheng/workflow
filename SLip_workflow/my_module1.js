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
        // const String;
        try {
            const alert = await findAlert(id);
            const order = alert.order+1;
            const boolean = await authenticate(user, order);

            if (alert.id) {
                if (boolean === true && judgement === "agree") {
                    if(alert.order < 2){
                        Alert_model.update(
                            { _id: alert.id },
                            {
                                $set: {
                                    step: "pending",
                                    order: alert.order+1
                                }
                            }
                        ).exec();
                        // return 'true';
                    }
                    else if(alert.order === 2){
                        Alert_model.update(
                            { _id: alert.id },
                            {
                                $set: {
                                    step: "ok",
                                    order: 0
                                }
                            }
                        ).exec();
                    }
                }
                else if(boolean === true && judgement === 'disagree'){
                    Alert_model.update(
                        { _id: alert.id },
                        {
                            $set: {
                                step: "reject",
                                order: 0
                            }
                        }
                    ).exec();
                }
                else if(boolean === false){
                    const err = new Error('user id invalid');
                    throw err;
                }
            }
            else {
                const err = new Error("alert id invalid");
                throw err;
            }
            // String = 'successful'
            // return String;
        } catch (err) {
            console.log(err);
        }
    };
    start();
}

module.exports = { saveAlert, beExecute };
