const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    _id : Schema.Types.ObjectId,
    step : String,
    order : Number,
    date : Date
})

const Alert = mongoose.model('Alert',alertSchema);
module.exports= Alert;