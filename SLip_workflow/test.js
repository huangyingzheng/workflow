const db = require("./../db.js");
const mongoose = require("mongoose");
const User = require("./user.js");
const Habilitation = require("./habilitation.js");
const modules1 = require("./my_module1");
const Config = require("./workflow_config");

// modules1.saveAlert(new Date());
modules1.beExecute('5a9eba2b2efcb45e07c84f57','5a993179661aa026d7ee44f5','agree');
// const id = '5a993179661aa026d7ee44f5'
// const start = async function(id) {
//     const result = await Habilitation.findOne({ users_id: id }).exec();
//     console.log(result);
//     const result1 = await Config.findOne({ hab_id: result._id }).exec();
//     const f = function(){ if(result1.order === 1){
//         return true
//     }}
//     console.log(f());
//     console.log(result1);
// }
// start('5a993179661aa026d7ee44f5');
// result.then(hab =>{Config.findOne({ hab_id: hab._id }).exec();}, err => {console.log(err)})


// Config.create({_id: new mongoose.Types.ObjectId, hab_id:undefined,profile:'m',order:2});

// Habilitation.findOne({_id:'5a993179661aa026d7ee44f8'},function(err,result){
//     if (err){
//         console.log(err);
//     }
//     else{
//         Config.findOne({_id:'5a9e790979a81c28318c86ea'},function(err,config){
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 config.addHab1(result,function(err){
//                     console.log(err);
//                 });
//             }
//         })
//     }
// })
