const mongoose = require('mongoose');
const Dino = require('./DinoSchema');

mongoose.connect("mongodb://localhost:27017/dino", () => {
    console.log("Connected to MongoDB");
}, 
    e => console.log(e)
);

// const dino = new Dino({ name: "T-Rex", colour: "Green"});
// dino.save().then(() => {
//     console.log("Dino Saved");
// });
