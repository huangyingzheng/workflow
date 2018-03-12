const mongoose = require("mongoose");
const db = require("./../db.js");
const Alert_model = require("./alert");
const Config = require("./workflow_config");
const Step = require("./step");

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
            this.alert.current_step = 1;
            this.alert.current_order = 1;
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

    async findAlert(id) {
        try {
            const result = await Alert_model.findOne({
                _id: mongoose.Types.ObjectId(id)
            });
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

    view() {

        const config_id = this.step[this.current_step].[this.current_order];
        console.log(config_id);

    } //montre en quel etape et qui peux operer.
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
const start = async function(){
    try{
        let alert = await a.initialise();
        // let result  = a.findAlert("5aa694d6d8c9e03206285b35");
        // console.log(result);
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
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
