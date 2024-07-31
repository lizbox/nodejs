let mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/firstApi'
).then(()=>{
    console.log('connected');
    },
    err=>{
        console.log('failed' + err);
    });

let Fruit = require('./fruit');

module.exports.Fruit = Fruit;