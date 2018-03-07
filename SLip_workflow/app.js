const express = require("express");
const app = express();
const db = require("./../db.js");
const User = require("./user.js");
const Habilitation = require("./habilitation.js");
const modules1 = require("./my_module1");
const Config = require("./workflow_config");
const Alert_model = require("./alert");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/:collection", function(req, res) {
    const collection = req.params.collection;
    console.log(collection);
    switch (collection) {
        case "User":
            User.find({}, function(err, result) {
                // user is a model, not a string;
                if (!err) {
                    res.send(result);
                }
            });
            break;
        case "Config":
            Config.find({}, function(err, result) {
                if (!err) {
                    res.send(result);
                }
            });
            break;
        case "Habilitation":
            Habilitation.find({}, function(err, result) {
                if (!err) {
                    res.send(result);
                }
            });
            break;
        case "Alert":
            Alert_model.find({}, function(err, result) {
                if (!err) {
                    res.send(result);
                }
            });
            break;
        default:
            res.status(500).send("collection no found");
    }
});

app.put('/user',urlencodedParser,function(req,res) {
    const name = req.body.name;
    User.create({_id:new mongoose.Types.ObjectId(),name:name},function(err){
        if(!err){
            res.send('create a user successful');
        }
    })
})

app.post('/alert_traiter',urlencodedParser,function(req,res){
    const alert_id = req.body.alert_id;
    const user_id = req.body.user_id;
    const judgement = req.body.judgement;

    console.log(typeof  modules1.beExecute(alert_id,user_id,judgement));
})
// app.put("/orgAxis", urlencodedParser, function(req, res) {
//     const name = req.body.name;
//     OrgAxis.create({ _id: new mongoose.Types.ObjectId(), name: name }, function(
//         err
//     ) {
//         if (err) {
//             res.send("error");
//             console.error(err);
//         } else {
//             res.send("an organization Axis create successful");
//         }
//     });
// });
//
// //find all organization Axis
// app.get("/orgAxis", function(req, res) {
//     OrgAxis.find({}, function(err, result) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(result);
//             res.send(result);
//         }
//     });
// });
//
// //find one organization Axis
// app.get("/orgAxis/:id", function(req, res) {
//     let obj = {};
//     const id = req.params.id;
//     OrgAxis.findOne({ _id: id }).exec(function(err, result) {
//         if (err) {
//             res.status(500).send("no record");
//             console.error(err);
//         } else {
//             obj.id = result._id;
//             obj.name = result.name;
//             res.send(obj);
//         }
//     });
// });
//
// app.put("/org", urlencodedParser, function(req, res) {
//     const name = req.body.name;
//     const orgAxis_id = req.body.orgAxis_id;
//     OrgAxis.findOne({ _id: orgAxis_id }, function(err, result) {
//         if (err) {
//             res.status(500).send("id no found");
//             console.error(err);
//         } else {
//             const orgAxis = result;
//             const org = new Org({
//                 _id: new mongoose.Types.ObjectId(),
//                 name: name
//             });
//             org.addAnOrgAxis(orgAxis, function(err) {
//                 if (err) {
//                     res.send("failed add an organization Axis");
//                 } else {
//                     res.send("add successful");
//                 }
//             });
//         }
//     });
// });
//
// app.get("/org/:id", function(req, res) {
//     let obj = {};
//     const id = req.params.id;
//     Org.findOne({ _id: id }).populate({path:{orgAxis},select:'oid'}).exec(function(err, result) {
//         if (err) {
//             res.status(500).send("no record");
//             console.error(err);
//         } else {
//             obj.id = result._id;
//             obj.name = result.name;
//             obj.Org = typeof result.orgAxis;
//             res.send(obj);
//         }
//     });
// });
// app.get("/orgAxis/:id", function(req, res) {
//     let obj = {};
//     const id = req.params.id;
//     OrgAxis.findOne({ _id: id }).exec(function(err, result) {
//         if (err) {
//             res.status(500).send("no record");
//             console.error(err);
//         } else {
//             obj.id = result._id;
//             obj.name = result.name;
//             res.send(obj);
//         }
//     });
// });

// app.get('/org/:id',function(req,res){
//     let obj ={};
//     const id = req.params.id;
//     Org.find({'orgAxis.$id': id},function(err,result){
//         if(err){
//             res.status(500).send('no record')
//             console.error(err);
//         }
//         else{
//             obj.id = result[0]._id;
//             obj.name = result[0].name;
//             // res.send(obj);
//             // obj.id = result._id;
//             // obj.name = result.name;
//             // // obj.OrganizationAxis = {};
//             obj.OrganizationAxis.ref = result.collection.collectionName;
//             obj.OrganizationAxis.id = result;
//             // console.log(result.orgAxis);
//
//         }
//     })
// })

app.listen(3000, function(err) {
    if (err) {
        console.log("failed connecting");
    } else {
        console.log(
            "server connect successful\n" +
                "serve launched successful http:// localhost:3000/"
        );
    }
});
