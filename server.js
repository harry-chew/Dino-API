const express = require('express');
const fs = require('fs/promises');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(async (req, res, next) => {
    const content = `${dateToISOLikeButLocal(new Date())} - ${req.method} - ${req.url} - AuthToken:${req.headers.authorization} \n`;
    
    await fs.appendFile('log.txt', content, { flag: 'a+' }, err => {
        if (err) {
          console.error(err);
        }
        console.log(`${Date()} - ${req.method} - ${req.url}`);
      });
    next();
});

const dateToISOLikeButLocal = (date) => {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal =  date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
};

app.get('/', (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});



const dinosRouter = require('./routes/dinos.js');
app.use('/dino', dinosRouter);



app.listen(8080, () => {
    console.log("Server started on port 8080");
});