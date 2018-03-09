const mongoose = require("mongoose");
const db = require("./../db.js");
const Alert_model = require("./alert");
const Config = require("./workflow_config");

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
        console.log(this.alert);
        this.alert.log.create_date = this.date;
        this.alert.current_step = 0;
        const that = this;
        const number = await Config.count();
        console.log(number);
        Config.find({ step: 1 })
            .then(val => {
                val.forEach(function(result) {
                    that.alert.step.push(result);
                });
            })
            .then(() => {
                that.alert.save();
            });
        //     Config.findOne({_id:'5a9fbdf5aae96b24ea86a9f7'}).then( val => {
        //         console.log(val._id);
        //         console.log(that);
        //         that.alert.step = val._id;
        //         console.log(that);}
        // ).then( () => {that.alert.save()})
    } // length step

    findAlert(id) {} //  handle late
    showCurrentUser() {}
    view() {}
    handleByOrder(
        judgement
    ) {} /* par exemple step[0], si le premier membre prendre une approvant decision
    alors passr a deuxieme membre dans ce step. si tous membre dans ce step approuvant,
    appeler nextStep, passer a etape suivant
    une fois, qui reponse no, retour no directment.*/
    nextStep() {} // currentStep +1 if celui qui appeler ce methodes est le derniere etap, retour ok
    previous() {}
    stop() {} //enregiste statement alors save
}

const a = new Alert(new Date());
a.initialise();
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
