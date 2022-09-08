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
    //console.log(url);
    try {
        const scrapeDino = await scrapePage(url);
        console.log(scrapeDino);
        res.status(201).send(scrapeDino);
    }
    catch(e) {

        res.status(404).send({msg:"failed", error: e});
    }
    
});

async function scrapePage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const title = await page.$x('/html/body/div[3]/h1/i');
    const titleText = await(await title[0].getProperty('textContent')).jsonValue();

    const image = await page.$x('//*[@id="mw-content-text"]/div[1]/table[1]/tbody/tr[2]/td/a/img');
    const imageSrc = await(await image[0].getProperty('src')).jsonValue();

    const info = await page.$x('//*[@id="mw-content-text"]/div[1]/p[2]');
    const infoText = await(await info[0].getProperty('textContent')).jsonValue();

    const desc = await page.$x('/html/body/div[3]/div[3]/div[5]/div[1]/p[5]');
    const descText = await(await desc[0].getProperty('textContent')).jsonValue();
    
    await browser.close();

    const returnObj = {
        name : titleText,
        image : imageSrc,
        info : infoText,
        description : descText
    };
    return returnObj;
};


module.exports = router;