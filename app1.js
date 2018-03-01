const db = require("./db.js");
const Student = require("./Student.js");
const Class = require("./Class.js");
const mongoose = require("mongoose");

// Student.findOne(
//     {'name': 'B'},
//     function(err,result){
//         var result = result;
//         console.log(result)
//
//         // res.send(result);
//     }
// )

const studentA = new Student({
  _id: new mongoose.Types.ObjectId(),
  name: "A",
  sex: "male"
});

const studentB = new Student({
  _id: new mongoose.Types.ObjectId(),
  name: "B",
  sex: "female"
});

const maths = new Class({
  _id: new mongoose.Types.ObjectId(),
  name: "Maths"
});

maths.addStudent(studentA, err => {
  if (err) {
    console.error(err);
  }
  console.log("add successful");
});
maths.addStudent(studentB, err => {
  if (err) {
    console.error(err);
  }
  console.log("add successful");
});

studentA.save();
studentB.save();
