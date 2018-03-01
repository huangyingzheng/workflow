const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgAxisSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : String
},{collection: 'organizationAxis'})

const OrgAxis = mongoose.model('OrgAxis',orgAxisSchema);
module.exports = OrgAxis;