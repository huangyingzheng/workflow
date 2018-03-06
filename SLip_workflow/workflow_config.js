const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
    _id : Schema.Types.ObjectId,
    hab_id : {type: Schema.Types.ObjectId, ref: 'Habilitation'},
    profile : String,
    order : Number
})

configSchema.methods.addHab = function(obj,cb){
    this.hab_id = mongoose.Types.ObjectId(obj._id);
    console.log(this);
    this.save(cb);
}

Config = mongoose.model('Config',configSchema);
module.exports = Config;
