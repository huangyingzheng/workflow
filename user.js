const mongoose = require('mongoose');
const db = require('./db.js')
const userSchema = new mongoose.Schema({
    lastname : {type : String, default : "no firstname"},
    firstname : {type : String, default : "no lastname"},
    age : {type : Number}
});// 建立一个模板
const userSchema1 = db.model('User',userSchema);//A model is a class with which we construct documents.
// 相当于构造器， schema be compiled to constructor then toward instance
module.exports = userSchema1;