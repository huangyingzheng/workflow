const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Config = require("./workflow_config");
const Alert_model = require("./alert");
const User = require('./user.js');
const Habilitation = require('./habilitation.js');

class Alert{
    constructor(date, place, person) {
        this.date = date;
        this.place = place;
        this.person = person;
    }
    find() {}
    beExecute(user_id,judgement) {
        if (user_id === undefined && judgement === undefined) {
            const alert1 = Alert_model.create({
                _id: new mongoose.Types.ObjectId(),
                date: new Date()
            }, function (err) {
                if (err) {
                    // return new Error(err);
                    console.error(err);
                }
                else {
                    console.log('successful create an alert');
                    return alert1;
                }
            })
        }
        // exec is not a function;

        else{
            if (user_id){
                Habilitaion.findOne({users_id : user_id}).exec(function(err,result){ // exec 仅在find 和findOne下可用
                    if(err){
                        console.log('err');
                    }
                    else {return result._id}

                }).then(Workflow.findOne({hab_id : result_id}).exec(function(err,habilitation){if(err){
                    console.log('err');
                }
                else {return habilitation._id}

                })).then(Config.findOne({_id : habilitation.id})exec(function(err,config){
                    if(err){
                        console.log('err');
                    }
                    else{
                        return config.profile;
                    }
                }))
                }
            }
        }


}
module.exports = Alert;




// beExecute(order, user_id) {
//     const finish = false;
//     //si le record n'a pas enregiste dans la base de donne, on le enregiste
//     if (user_id || order === false) {// 或逻辑
//         const alert1 = Alert.create({
//             id: new Schema.Types.ObjectId(),
//             date: new Date()
//         }).exec(function(err) {
//             if (err) {
//                 return new Error(err);
//             }
//         });
//     }
//     else if(order){}
// }
//重构方法