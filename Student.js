const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    name : String,
    sex : String
})

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;