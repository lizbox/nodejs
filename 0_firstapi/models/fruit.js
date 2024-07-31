// require function in Node.js includes module
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let FruitSchema = new Schema({
    name: String,
    type: String,
    color: String,
    isDry: Boolean,
    imageUrl: String
});

// Modify some properties in mongoose object
let Fruit = mongoose.model('Fruit', FruitSchema)

module.exports = Fruit;