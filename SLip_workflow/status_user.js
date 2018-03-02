const mongoos = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    _id : Schema.Types.ObjectId,
    user_id : {type:Schema.Types.ObjectId, ref:'User'},
    active : boolean,
    alert_id : {type:Schema.Types.ObjectId, ref:'Alert'}
})

Status = mongoose.model('Status',statusSchema);
module.exports = Status;