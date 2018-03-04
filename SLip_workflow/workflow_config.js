const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
    _id : Schema.Types.ObjectId,
    hab_id : {type:Schema.Types.ObjectId, ref:'Habilitation'},
    profile : String,
    order : Number
})

const Config = mongoose.model('Config',configSchema);
module.exports = Config;
