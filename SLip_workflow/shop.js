const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    org : [{'$ref': String, '$id': {type: Schema.Types.ObjectId, ref: 'Org'}}]
})

const Shop = mongoose.model('Shop',shopSchema);
module.exports = Shop;