const db= require('./db.js');
const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    _id : {type : Number,default : 0},
    name : {type : String,default :'empty'},
    organizationAxis : {type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationAxis' }
})

const organization_model = db.model('Organization',organizationSchema);
module.exports = organization_model;