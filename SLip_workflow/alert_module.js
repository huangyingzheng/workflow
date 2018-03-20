const mongoose = require("mongoose");
const db = require("./../db.js");
const Alert_model = require("./alert");
const Config = require("./workflow_config");
const Step = require("./step");
const assert = require("assert");
const Habilitation = require("./habilitation");
const User = require("./user");
const Status_user = require("./status_user");
const _ = require("lodash");

class Alert {
    constructor(date) {
        if (_.isDate(date)) {
            this.date = date;
            const alert = new Alert_model({
                _id: new mongoose.Types.ObjectId(),
                log: {}
            });
            this.alert = alert;
        } else {
            return new Promise(function(resolve, reject) {
                reject("invalid object");
            });
        }
    }

    async initialise(number) {
        try {
            this.alert.log.create_date = this.date;
            this.alert.current_step = 1;
            this.alert.current_order = 0;
            this.alert.step_number = number;
            const that = this;
            if (this.alert.step_number < 2) {
                return Promise.reject("Step number necessity more than 2");
            } else {
                for (let i = 0; i < number; i++) {
                    that.alert.step.push([]);
                }
                const save = await that.alert
                    .save()
                    .catch(err => Promise.reject("can not save"));
                return that;
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async addController(c_step_number) {
        try {
            const that = this;
            const config = await Config.find({ step: c_step_number })
                .exec()
                .catch(err =>
                    Promise.reject("work_config correspond no found")
                );
            config.forEach(function(sub) {
                that.alert.step[0].push(sub.id);
                that.alert.markModified("step");
            });
            const save = await this.alert.save();
            return save;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async addManager(c_step_number, step_number) {
        try {
            const that = this;
            const config = await Config.find({ step: c_step_number })
                .exec()
                .catch(err =>
                    Promise.reject("work_config correspond no found")
                );
            config.forEach(async function(sub) {
                that.alert.step[step_number].push(sub._id);
                that.alert.markModified("step");
            });
            const save = await this.alert.save();
            return save;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async initialise_view() {
        try {
            const view = Status_user;
            let i = this.alert.current_step;
            let j = this.alert.current_order;
            let config_id = [];
            const current_user = this.alert.step[i][j];
            this.alert.step[0].forEach(function(sub) {
                config_id.push(sub);
            });
            config_id.push(current_user);
            const that = this;
            for (let index = 0; index in config_id; index++) {
                const config = await Config.findOne({
                    _id: config_id[index]
                })
                    .exec()
                    .catch(err => Promise.reject("no work_config correspond"));
                if (index === config_id.length - 1) {
                    view.step = that.alert.current_step;
                    view.order = that.alert.current_order;
                    view.active = true;
                } else {
                    view.step = 0;
                    view.active = false;
                }
                const habilitation = await Habilitation.findOne({
                    _id: config.hab_id
                })
                    .exec()
                    .catch(err => Promise.reject("no habilitation correspond"));
                const users = habilitation.users_id;
                users.forEach(async function(user) {
                    let view_instance = new view({
                        _id: new mongoose.Types.ObjectId(),
                        alert_id: that.alert._id,
                        step: view.step,
                        order: view.order,
                        user_id: user,
                        active: view.active
                    });
                    view_instance.save().then(val => {
                        console
                            .log(val);
                    }).catch(err => Promise.reject("can not save"));
                });
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async findAlert(id) {
        try {
            const result = await Alert_model.findOne({
                _id: mongoose.Types.ObjectId(id)
            }).exec();
            result.log.handle_day = this.date;
            result.markModified("log");
            this.alert = result;
            const save = await result.save();
            return this ;
        } catch (err) {
            return new Promise(function(resolve, reject) {
                reject("id no found");
            });
        }
    }

    async nextStep() {
        try {
            const that = this;
            if (that.alert.step === undefined) {
                console.log("record not exist");
                return new Promise(function(resolve, reject) {
                    reject("record not exist");
                });
            } else if (that.alert.step.length === 0) {
                console.log("no record");
                return await new Promise(function(resolve, reject) {
                    reject("no record");
                });
            } else {
                if (
                    that.alert.current_order + 1 <
                    that.alert.step[that.alert.current_step].length
                ) {
                    await Alert_model.update(
                        { _id: mongoose.Types.ObjectId(that.alert._id) },
                        { $set: { current_order: that.alert.current_order + 1 } }
                    ).exec();
                    console.log( "successful:" +
                        " current_step " +
                        that.alert.current_step +
                        " current_order " +
                        (that.alert.current_order + 1));
                    return new Promise(function(resolve, reject) {
                        resolve(
                            "successful:" +
                                " current_step " +
                                that.alert.current_step +
                                " current_order " +
                                (that.alert.current_order + 1)
                        );
                    });
                } else if (
                    that.alert.current_order + 1 ===
                    that.alert.step[that.alert.current_step].length
                ) {
                    if (that.alert.current_step + 1 === that.alert.step.length) {
                        console.log("successful:" +
                            " current_step " +
                            that.alert.current_step +
                            " current_order " +
                            that.alert.current_order +
                            "\nhere is the end of step");
                        return new Promise(function(resolve, reject) {
                            resolve(
                                "successful:" +
                                    " current_step " +
                                    that.alert.current_step +
                                    " current_order " +
                                    that.alert.current_order +
                                    "\nhere is the end of step"
                            );
                        });
                    } else {
                        await Alert_model.update(
                            { _id: mongoose.Types.ObjectId(that.alert._id) },
                            {
                                $set: {
                                    current_step: that.alert.current_step + 1,
                                    current_order: 0
                                }
                            }
                        ).exec();
                        console.log("successful:" +
                            " current_step " +
                            (that.alert.current_step + 1) +
                            " current_order " +
                            0);
                        return await new Promise(function(resolve, reject) {
                            resolve(
                                "successful:" +
                                    " current_step " +
                                    (that.alert.current_step + 1) +
                                    " current_order " +
                                    0
                            );
                        });
                    }
                }
            }
        } catch (err) {
            return err;
        }
    }
    async previous() {
        try {
            const that = this;
            if (that.alert.step === undefined) {
                // throw new Error('no record')
                return  new Promise(function(resolve, reject) {
                    reject("record not exist");
                });
            } else if (that.alert.step.length === 0) {
                return new Promise(function(resolve, reject) {
                    reject("no record");
                });
            } else {
                const order = that.alert.current_order;
                const step = that.alert.current_step;
                if (order > 0) {
                    await Alert_model.update(
                        {
                            _id: mongoose.Types.ObjectId(that.alert._id)
                        },
                        { $set: { current_order: that.alert.current_order - 1 } }
                    ).exec();
                    console.log( "successful:" +
                        " current_step " +
                        that.alert.current_step +
                        " current_order " +
                        (that.alert.current_order - 1));
                    return await new Promise(function(resolve, reject) {
                        resolve(
                            "successful:" +
                                " current_step " +
                                that.alert.current_step +
                                " current_order " +
                                (that.alert.current_order - 1)
                        );
                    });
                } else if (order === 0) {
                    if (step <= 1) {
                        console.log("you have not authority to access");
                        return await new Promise(function(resolve, reject) {
                            reject("you have not authority to access");
                        });
                    } else {
                        await Alert_model.update(
                            { _id: that.alert._id },
                            {
                                $set: {
                                    current_step: that.alert.current_step - 1,
                                    current_order:
                                        that.alert.step[that.alert.current_step - 1]
                                            .length - 1
                                }
                            }
                        ).exec();
                        console.log("successful:" +
                            " current_step " +
                            (that.alert.current_step - 1) +
                            " current_order " +
                            (that.alert.step[that.alert.current_step - 1]
                                    .length -
                                1));
                        return await new Promise(function(resolve, reject) {
                            resolve(
                                "successful:" +
                                    " current_step " +
                                    (that.alert.current_step - 1) +
                                    " current_order " +
                                    (that.alert.step[that.alert.current_step - 1]
                                        .length -
                                        1)
                            );
                        });
                    }
                }
            }
        } catch (err) {
            return err;
        }
    }
}
module.exports = Alert;

// const start = async function() {
//     try {
//         let a = new Alert(new Date());
//         a = await a.initialise(2);
//         await a.addController(0);
//         await a.initialise_view();
//         await a.findAlert('5ab0e09068f0e2212d53560d');
//         await a.nextStep();
//         await a.previous();
//     } catch (err) {
//         console.log(err);
//     }
// };
// start();

