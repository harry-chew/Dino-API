const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('scrape');
    }
    catch(err) {
        res.status(404).send({msg: 'Could not retrieve.'});
        console.log(err);
    }
});

router. post('/', async (req, res) => {
    const url = req.body.url;
    console.log(url);
    try {
        const scrapeDino = await scrapePage(url);
        console.log(scrapeDino);
        res.status(201).send(scrapeDino);
    }
    catch {
        res.status(404).send({msg:"failed"});
    }
    
});

async function scrapePage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const element = await page.$x('/html/body/div[3]/h1/i');
    const title = await(await element[0].getProperty('textContent')).jsonValue();
    await browser.close();
    return title;
};


module.exports = router;