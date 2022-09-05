const mongoose = require('mongoose');
const Dino = require('./MongoSchemas/DinoSchema');

mongoose.connect("mongodb://localhost:27017/dino", () => {
    console.log("Connected to MongoDB");
}, 
    e => console.log(e)
);