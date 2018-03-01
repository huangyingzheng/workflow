const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/learning');

const db =  mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function f() {
    console.log('connect successful')
});
module.exports = db;