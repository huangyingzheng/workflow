const express = require('express');
const app = express();
const db = require('./../../db.js')
const bodyParser = require('body-parser')
const Student = require('./../../Student.js');
const Class = require('./../../Class.js');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// Student.findOne(
//     {'id': 1},
//     function(err,result){
//         console.log(result)
//
//         // res.send(result);
//     }
// )
// check 用异步函数检查同步函数，一直报错。
// const assume = function(collections,name){
//     collections.findOne({'name' : name},function(err,result){
//         if(err){
//             return false;
//         }
//         else if (result === undefined){
//             return false;
//         }else if (result === null){
//             return false;
//         }else{
//             return true;
//         }
//
//     })
// }


// find all
app.get('/students', function(req,res){
    Student.find(
        {},
        function(err,result){
            res.send(result);
        }
    )
})
// find one
app.get('/students/:_id',function(req,res,next){
    const _id = req.params._id;

        Student.findOne({'_id': _id},
            function (err, result) {
                if(err){
                res.status(500).send('id no found');}
                    res.send(result._id);//没有这个方法接着往上找}

            })
})

// update one
app.post('/students/:_id',urlencodedParser,function(req,res){
    const _id = req.params._id;
    let sex = req.body.sex;
    let sex_1 = sex.toString();
    Student.update({_id : _id},{$set:{sex : sex_1}},function(err){
            (err)?
                console.error(err):
                res.send('update successful');
        })
})
// create one
app.put('/students',urlencodedParser,function(req,res){
    const name = req.body.name;
    const sex = req.body.sex;
    Student.create({ '_id':new mongoose.Types.ObjectId(),'name': name,'sex':sex},function (err) {

        if (err){
        console.error(err);
        }

        res.send('insert successful')
    })
})
//delete
app.delete('/students/:_id',function(req,res){
    const _id = req.params._id;
       if(_id){
           Student.remove({_id:_id},function (err) {
               (err)?console.error(err):
                   res.send('delete'+ _id +'successful');
           })
       }else{
           Student.remove({},function (err) {
               (err)?console.error(err):
                   res.send('delete all successful');
           })
       }
})
//show all class
app.get('/class',function (req,res) {
    Class.find({},function (err,result) {
        (err)?console.error(err):
            res.send(result);
    })
})
//show a class
app.get('/class/:_id',function(req,res){
    const _id = req.params._id;
    Class.findOne({'_id': _id},
        function (err, result) {
            if(err){
                res.status(500).send('id no found');}
            res.send(result);//没有这个方法接着往上找}

        })
})
//push a student in a class
app.post('/class',urlencodedParser,function (req,res) {
    const student_id = req.body.student_id;
    const class_id = req.body.class_id;
    Student.findOne({_id : student_id},function(err,result){
        if(err){
            res.status(500).send('student id no found');
        }else{
            const student = result;
            Class.findOne({_id:class_id},function(err,result){
                if(err){
                    res.status(500).send('class id no found')
                }
                else{
                    result.addStudent(student, (err) => {
                        if(err){
                            res.status(500).send('error addStudent')
                            console.error(err)
                        } else {
                            res.send('add successful')
                        }
                    });
                }
            })
        }
    })
})

app.listen(3000,function (err) {
    (err)?console.error(err):
    console.log('serve launcher successful http:// localhost:3000/');
});