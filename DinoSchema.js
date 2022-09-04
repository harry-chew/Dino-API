const mongoose = require('mongoose');

const dinoSchema = new mongoose.Schema({
    name : String,
    colour : String
});

module.exports = mongoose.model('Dino', dinoSchema);