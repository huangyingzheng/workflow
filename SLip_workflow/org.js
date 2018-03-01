const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    orgAxis : {'$ref': String, '$id': {type: Schema.Types.ObjectId, ref: 'OrgAxis'}}
})

orgSchema.methods.addAnOrgAxis = function (object,callback){
    this.orgAxis.$ref = object.collection.collectionName;
    this.orgAxis.$id = object._id;
    this.save(callback);
}

const Org = mongoose.model('Org',orgSchema);
module.exports = Org;