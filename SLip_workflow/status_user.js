const mongoose = require('mongoose');
const Schema = mongoose.Schema;

status_usersSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    alert_id : Schema.Types.ObjectId,
    active: Boolean,
    step:Number,
    order:Number
})

Status_user = mongoose.model('Status_user',status_usersSchema);

module.exports = Status_user;