const db = require('./../db.js');
const mongoose = require('mongoose');
const User = require('./user.js');
const Habilitation = require('./habilitation.js');
const alert = require('./my_module')
const modules1= require('./my_module1')

const a = new alert(new Date(), 'here','me');
a.beExecute();

// const p = new modules(1,2);
// const o = new modules(3,4)
// const p1 = modules.distance(p,o);
// console.log(p1);
//
// const result = modules1.fct(10,11);
// console.log(result);
// const A = new User({_id : new mongoose.Types.ObjectId(), name : 'Mr.A'})
// A.save(function (err,obj) {
//     if(err){
//         return console.error(err)
//     }
//     console.log('inserted successful'+ obj);
//
// })
//
// const B = new User({_id : new mongoose.Types.ObjectId(), name : 'Mr.B'})
// B.save(function (err,obj) {
//     if(err){
//         return console.error(err)
//     }
//     console.log('inserted successful'+ obj);
//
// })
//
// const C = new User({_id : new mongoose.Types.ObjectId(), name : 'Mr.C'})
// C.save(function (err,obj) {
//     if(err){
//         return console.error(err)
//     }
//     console.log('inserted successful'+ obj);
//
// })
//
// const post = new Habilitation({_id : new mongoose.Types.ObjectId(), name : 'emploie'},function(err){
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log('successful habilitation');
//     }
// })
//
// post.addUser([A,B,C],function(err){
//     if(err){
//         console.error(err);
//     }
//     else{
//         console.log('successful insert')
//     }
// })