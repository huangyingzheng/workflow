const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    _id : Schema.Types.ObjectId,
    step : [{type :Schema.Types.ObjectId, ref: 'Config'}],
    current_step : Number,
    log : Schema.Types.Mixed
})

const Alert = mongoose.model('Alert',alertSchema);
module.exports= Alert;