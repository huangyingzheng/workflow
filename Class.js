const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    name : String,
    // Student : [{ type: Schema.Types.ObjectId, ref: 'Student' }]
    Student : [{'$ref': String, '$id': {type: Schema.Types.ObjectId, ref: 'Student'}}]
})

// classSchema.methods.addStudent = function (studentObj,cb){
//     this.Student.push(studentObj);
//     this.save(cb);
// }
classSchema.methods.addStudent = function (studentObj,cb){
    // this.Student.push('$ref': studentObj.model());
    this.Student.push({ '$ref': studentObj.collection.collectionName,'$id': studentObj});
    this.save(cb);
}


const Class = mongoose.model('Class',classSchema);
module.exports = Class;