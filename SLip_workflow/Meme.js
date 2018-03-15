var mongoose = require('mongoose');

var memeSchema = new mongoose.Schema({
    name: { type: String, required: true  }
});

module.exports = mongoose.model('Meme', memeSchema);
