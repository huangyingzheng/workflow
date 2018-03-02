const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Slp_work-flow');

const db =  mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function f() {
    console.log('data base onnect successful')
});
module.exports = db;