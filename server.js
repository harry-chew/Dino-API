const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

const dinosRouter = require('./routes/dinos.js');
app.use('/dino', dinosRouter);

app.listen(8080, () => "App listening on port 8080");