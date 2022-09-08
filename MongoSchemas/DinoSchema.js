const mongoose = require('mongoose');

const dinoSchema = new mongoose.Schema({
    name : String,
    image : String,
    info : String,
    description: String
});

module.exports = mongoose.model('Dino', dinoSchema);