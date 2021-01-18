const { puppeteer } = require('puppeteer');
const { selectMonth } = require('./basicInformation');
const { creden, toke, authorize, inputTrass } = require('./googleAuth')
require('dotenv').config();

const e = [1, 1, 1, 1, 1, 1]
console.log(selectMonth)
authorize(creden, e, inputTrass);