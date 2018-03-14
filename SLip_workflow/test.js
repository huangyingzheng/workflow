const db = require("./../db.js");
const mongoose = require("mongoose");
const User = require("./user.js");
const Alert_model = require("./alert");
const Habilitation = require("./habilitation.js");
const modules1 = require("./my_module1");
const Config = require("./workflow_config");
const Step = require("./step.js");
const assert = require("assert");


// var getNumbers = () => {
//     return Promise.resolve([1, 2, 3])
// }
// var multi = num => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//         if (num) {
//             resolve(num * num)
//         } else {
//             reject(new Error('num not specified'))
//         }
//     }, 1000)
// })
// }
// async function test () {
//     var nums = await getNumbers()
//     for(let index = 0; index < nums.length; index++) {
//         () => {console.log(1)};
//         (async x => {
//             console.log(2)
//             var res = await multi(x)
//             console.log(res)
//         })(nums[index])
//         console.log(3);//上一条程序还没哟结束就开始执行下一条程序了。
//         /*forEach()的机制就是，将array里面的东西一次性，同步执行回调函数
//         * */
//     }
// }
// test()


/*create step
* */
// const step1 = new Step({
//     _id: new mongoose.Types.ObjectId(),
//     name: "step_2"
// });
//
// Config.find({ step: 1 }).then(val => {
//     val.forEach(function(result) {
//         step1.comprises.push(result._id);
//         step1.save();
//     });
// });





/*test previous code*/
// modules1.saveAlert(new Date());
// const s = modules1.beExecute('5a9ffd51321b5643631e1168','5a9d0f75568cc91a3e3d3359','agree');
// s.then(() => {console.log('successful')},(err) => {console.log(err)});
// s.catch(err => {console.log(err)})
// s.then(val => {console.log(val)})
// console.log(typeof s);
// s.then(val => {console.log(val)})
// .then(val => {console.log(val)})
// console.log(string);
// _id:'5a9fb4c357161c1f46ea08eb' order 2
//'5a993179661aa026d7ee44f5' order 1
//'5a9d0f75568cc91a3e3d3359' order 3





// Config.create({_id: new mongoose.Types.ObjectId, hab_id:undefined,profile:'order3',order:2,step:1});
//
// Habilitation.findOne({_id:'5aa91f2c571bd12efcdf7d62'},function(err,result){
//     if (err){
//         console.log(err);
//     }
//     else{
//         Config.findOne({_id:'5aa91edd4abcb82ebe7e309f'},function(err,config){
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 config.addHab(result,function(err){
//                     console.log(err);
//                 });
//             }
//         })
//     }
// })

// User.create({_id: new mongoose.Types.ObjectId(),name: 'D'});
//
// Habilitation.create({_id: new mongoose.Types.ObjectId(),name: 'department manager'});
//
// Habilitation.findOne({_id:'5aa91f2c571bd12efcdf7d62'},function(err,hab){
//     if(err){
//         console.log(err)
//     }
//     else{
//         User.findOne({_id:'5a9fb4c357161c1f46ea08eb'},function(err,user){
//             hab.addUser(user,function(err){if(!err){console.log('s')}})
//         })
//     }
// })

// const test = async () => {
//     try{
//         const result = await Alert_model.findOne({_id:"5a9fef608bc8ec3a1316b59f"})
//             .exec();
//         return result;
//     }
//     catch(err) {
//         console.log(err);
//     }
// }
// test().then(val => {
//     console.log(val)
// });

// Alert_model.findOne({_id:"5a9fef608bc8ec3a1316b59f"})
//     .then(val => {console.log(val)},err => {console.log(err)});

// Habilitation.find({_id:'5a993179661aa026d7ee44f8'}).then(val => {console.log(val[0].users_id)});
