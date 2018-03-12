const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    _id : Schema.Types.ObjectId,
    step : [],
    current_step : Number,
    current_order : Number,
    log : Schema.Types.Mixed
})

const Alert = mongoose.model('Alert',alertSchema);
module.exports= Alert;