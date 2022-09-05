async function scrapePage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const name = (await page.$x('//*[@id="firstHeading"]'))[0];
    await browser.close();
    console.log(name);
};

scrapePage('https://en.wikipedia.org/wiki/Aardonyx');