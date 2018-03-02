const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

const habSchema = new Schema({
    _id : Schema.Types.ObjectId,
    name : String,
    users_id : [ {type:Schema.Types.ObjectId, ref:'User'}]
    // users : [{'$ref': String, '$id': {type: Schema.Types.ObjectId, ref: 'User'}}]
})

habSchema.methods.addUser = function(object,callback){
    if(_.isArray(object)){
        const that = this;
        object.forEach(function(subObject){
            that.users_id.push(subObject._id);
            that.save(callback);
        })
    }
    else{
        this.users_id.push(object._id);
        this.save(callback);
    }

}

Habilitation = mongoose.model('Habilitation',habSchema);
module.exports = Habilitation;