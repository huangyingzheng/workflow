const express = require("express");
const app = express();
const db = require("./../db.js");
const OrgAxis = require("./orgAxis");
const Org = require("./org");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.put("/orgAxis", urlencodedParser, function(req, res) {
    const name = req.body.name;
    OrgAxis.create({ _id: new mongoose.Types.ObjectId(), name: name }, function(
        err
    ) {
        if (err) {
            res.send("error");
            console.error(err);
        } else {
            res.send("an organization Axis create successful");
        }
    });
});

//find all organization Axis
app.get("/orgAxis", function(req, res) {
    OrgAxis.find({}, function(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//find one organization Axis
app.get("/orgAxis/:id", function(req, res) {
    let obj = {};
    const id = req.params.id;
    OrgAxis.findOne({ _id: id }).exec(function(err, result) {
        if (err) {
            res.status(500).send("no record");
            console.error(err);
        } else {
            obj.id = result._id;
            obj.name = result.name;
            res.send(obj);
        }
    });
});

app.put("/org", urlencodedParser, function(req, res) {
    const name = req.body.name;
    const orgAxis_id = req.body.orgAxis_id;
    OrgAxis.findOne({ _id: orgAxis_id }, function(err, result) {
        if (err) {
            res.status(500).send("id no found");
            console.error(err);
        } else {
            const orgAxis = result;
            const org = new Org({
                _id: new mongoose.Types.ObjectId(),
                name: name
            });
            org.addAnOrgAxis(orgAxis, function(err) {
                if (err) {
                    res.send("failed add an organization Axis");
                } else {
                    res.send("add successful");
                }
            });
        }
    });
});

app.get("/org/:id", function(req, res) {
    let obj = {};
    const id = req.params.id;
    Org.findOne({ _id: id }).populate({path:{orgAxis},select:'oid'}).exec(function(err, result) {
        if (err) {
            res.status(500).send("no record");
            console.error(err);
        } else {
            obj.id = result._id;
            obj.name = result.name;
            obj.Org = typeof result.orgAxis;
            res.send(obj);
        }
    });
});
app.get("/orgAxis/:id", function(req, res) {
    let obj = {};
    const id = req.params.id;
    OrgAxis.findOne({ _id: id }).exec(function(err, result) {
        if (err) {
            res.status(500).send("no record");
            console.error(err);
        } else {
            obj.id = result._id;
            obj.name = result.name;
            res.send(obj);
        }
    });
});

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
