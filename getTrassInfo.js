const puppeteer = require('puppeteer');
const { selectMonth } = require('./basicInformation');
const { gotoTrass, inputInfo } = require('./browerAuto');
const { creden, toke, authorize, inputTrass } = require('./googleAuth')
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 20
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1000,
    });
   
   await gotoTrass(page);
   await inputInfo();
})();