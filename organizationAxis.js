const db= require('./db.js');
const mongoose = require('mongoose');
const organizationAxisSchema = new mongoose.Schema({
    _id : {type : Number},
    name : {type : String, default : 'empty'}
});
const organizationAxis_model = db.model('OrganizationAxis',organizationAxisSchema);
module.exports = organizationAxis_model;