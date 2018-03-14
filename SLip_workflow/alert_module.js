const mongoose = require("mongoose");
const db = require("./../db.js");
const Alert_model = require("./alert");
const Config = require("./workflow_config");
const Step = require("./step");
const assert = require("assert");
const Habilitation = require("./habilitation");
const User = require("./user");
const Status_user = require("./status_user");

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

class Alert {
    constructor(date) {
        this.date = date;
        const alert = new Alert_model({
            _id: new mongoose.Types.ObjectId(),
            log: {}
        });
        this.alert = alert;
        // return alert;
    }

    async initialise() {
        try {
            this.alert.log.create_date = this.date;
            this.alert.current_step = 0;
            this.alert.current_order = 0;
            const that = this;
            const step = await Step.find({});
            const insert = step.some(function(result) {
                that.alert.step.push(result.comprises);
            });
            const save = await that.alert.save();
            return save;
        } catch (err) {
            throw err;
        }
    } //initialiser un object

    async initialise_view(result) {
        const view = Status_user;
        let i = result.current_step;
        let j = result.current_order;
        let config_id = undefined;
        const current_user = result.step[i][j];
        const controller = await Step.find({ name: "step_0" })
            .exec()
            .then(controller => {
                config_id = controller[0].comprises;
                config_id.push(current_user);
            });
        for (let index = 0; index in config_id; index++) {
            const config = await Config.findOne({
                _id: config_id[index]
            }).exec();
            if (index === 0) {
                view.step = 0;
                view.order = 0;
                view.active = false;
            } else {
                view.step = result.current_step;
                view.order = result.current_order;
                if (i === 0) {
                    view.active = false;
                } else {
                    view.active = true;
                }
            }
            const habilitation = await Habilitation.findOne({
                _id: config.hab_id
            }).exec();
            const users = habilitation.users_id;
            users.forEach(async function(user) {
                let view_instance = new view({
                    _id: new mongoose.Types.ObjectId(),
                    alert_id: result._id,
                    step: view.step,
                    order: view.order,
                    user_id: user,
                    active: view.active
                });
                await view_instance.save().then(val => {
                    console.log(val);
                });
            });
        }
    } // initialise a status_users

    async findAlert(id) {
        try {
            const result = await Alert_model.findOne({
                _id: mongoose.Types.ObjectId(id)
            }).exec();
            result.log.handle_day = this.date;
            result.markModified("log");
            const save = await result.save();
            return save;
        } catch (err) {
            const error = new Error("id no found");
            console.log(error);
            throw error;
        }
    } //  handle late

    async view(result) {
        const operation_id =
            result.step[result.current_step][result.current_order];
        const config = await Config.findOne({
            _id: mongoose.Types.ObjectId(operation_id)
        }).exec();
        const habilitation = await Habilitation.findOne({
            _id: config.hab_id
        }).exec();
        const users = [];
        const user_array = habilitation.users_id;
        for (let i = 0; i in user_array; i++) {
            const id = user_array[i];
            const user = await User.findOne({ _id: id });
            users.push(user + ", active");
        }
        return users;
    } //montre en quel etape et qui peux operer.

    async nextStep(result) {
        try {
            if (
                result.current_order + 1 <
                result.step[result.current_step].length
            ) {
                return await Alert_model.update(
                    { _id: mongoose.Types.ObjectId(result._id) },
                    { $set: { current_order: result.current_order + 1 } }
                ).exec();
            } else if (
                result.current_order + 1 ===
                result.step[result.current_step].length
            ) {
                if (result.current_step + 1 === result.step.length) {
                    throw "ok";
                } else {
                    return await Alert_model.update(
                        { _id: mongoose.Types.ObjectId(result._id) },
                        {
                            $set: {
                                current_step: result.current_step + 1,
                                current_order: 0
                            }
                        }
                    ).exec();
                }
            }
        } catch (err) {
            console.log(err);
        }
    } // currentStep +1 if celui qui appeler ce methodes est le derniere etap, retour ok

    async previous(result) {
        try {
            const order = result.current_order;
            const step = result.current_step;
            if (order > 0) {
                return await Alert_model.update(
                    {
                        _id: mongoose.Types.ObjectId(result._id)
                    },
                    { $set: { current_order: result.current_order - 1 } }
                ).exec();
            } else if (order === 0) {
                if (step <= 1) {
                    return;
                } else {
                    return await Alert_model.update(
                        { _id: result._id },
                        {
                            $set: {
                                current_step: result.current_step - 1,
                                current_order:
                                    result.step[result.current_step - 1]
                                        .length - 1
                            }
                        }
                    ).exec();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}

const a = new Alert(new Date());
const start = async function() {
    try {
        // let alert = await a.initialise();
        let alert = await a.findAlert("5aa7b20e6366252883250adb");
        // a.nextStep(alert);
        // a.initialise_view(alert);
        // const view = await a.view(alert);
        // console.log(view);
        await a.previous(alert);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
start();

// const a2 =async function(){
//     const a1 = await a.findAlert('5aa694d6d8c9e03206285b35');
//     console.log(a1);
// }
// a2();
// console.log(1);

// module.exports = {Alert}

// export class Workflow_config{
//     constructor(name){
//         this.name = name
//     }
//     addHabilitation(id){}
//     showComprenent{}
// }
//
// manager = new Workflow_config();
//
// a = new Alert(date);
// a = {
//     _id : mongoose.Types.ObjectId,
//     log : {
//         create_date:01,
//         handle_date_1:02
//     },
//     currentStep:2,// max length step,min 0
//     step:[[manager, department_manager],[director],[administateur]]
// }
