const express = require('express');
const fs = require('fs/promises');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(async (req, res, next) => {
    const content = `${dateToISOLikeButLocal(new Date())} - ${req.method} - ${req.url} - AuthToken:${req.headers.authorization} \n`;
    
    await fs.appendFile('log.txt', content, { flag: 'a+' }, err => {
        if (err) {
          console.error(err);
        }
        console.log(content);
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
    res.render('index');
});

const apiRouter = require('./routes/api.js');
app.use('/api', apiRouter);

const scrapeRouter = require('./routes/scrape.js');
app.use('/api/scrape', scrapeRouter);

const dinosRouter = require('./routes/dinos.js');
app.use('/api/dino', dinosRouter);

app.listen(8080, () => {
    console.log("Server started at http://localhost:8080");
});