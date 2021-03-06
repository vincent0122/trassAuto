const puppeteer = require('puppeteer');
const hsLoca = require('./basicInformation');

const pupeteerSet = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 20
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1000,
    })

    return page;
}

const gotoTrass = async (page) => {
   // const page = await pupeteerSet();
    await page.goto('https://www.bandtrass.or.kr/index.do');
    await page.waitForSelector('#landing_navigation > div > div:nth-child(3) > div > ul.navi_login > a:nth-child(1) > li')
    await page.click('#landing_navigation > div > div:nth-child(3) > div > ul.navi_login > a:nth-child(1) > li')
    await page.waitForSelector('#id')
    await page.type('#id', process.env.TRASS_ID)
    await page.type('#pw', process.env.TRASS_PW)
    await page.keyboard.press('Enter', {
        delay: 500
    })
    await page.goto('https://www.bandtrass.or.kr/customs/total.do?command=CUS001View&viewCode=CUS00301')
    await page.waitForSelector('#grid_type')
    await page.click('#search_div > table:nth-child(1) > tbody > tr > td > div:nth-child(2) > label')
    await page.click('#EI_DITC')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('#GODS_DIV')
    await page.click('#NATN_DIV')
    await page.click('#LOCATION_DIV')
    //품목 선택
    await page.click('#GODS_TYPE')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.click('#POPUP1', {
        dealy: 100
    })
}

const inputInfo = async () => {
   // const page = await pupeteerSet();
    async function hsCode(code) {
        await page2.type('#CustomText', code)
        await page2.keyboard.press('Enter')
        for (let i = 0; i < 10; i++) {
            await page2.keyboard.press('Backspace')
        }
        await page.waitForTimeout(100);
    }

    async function area(located) {
        await page.waitForSelector('#FILTER3_SELECT_CODE > span > div > button > span')
        await page.click('#FILTER3_SELECT_CODE > span > div > button > span')
        await page.click('#FILTER3_SELECT_CODE > span > div > ul > li.multiselect-item.multiselect-filter > div > input')
        await page.keyboard.press('Backspace', {
            dealy: 10
        })
        await page.keyboard.press('Backspace', {
            dealy: 10
        })
        await page.keyboard.press('Backspace', {
            dealy: 10
        })
        await page.waitForSelector('#FILTER3_SELECT_CODE > span > div > ul > li.multiselect-item.multiselect-filter > div > input')
        await page.type('#FILTER3_SELECT_CODE > span > div > ul > li.multiselect-item.multiselect-filter > div > input', located)
        await page.waitForTimeout(1000);
        await page.keyboard.press('Tab', {
            dealy: 50
        })
        await page.keyboard.press('Space', {
            dealy: 50
        })
        await page.keyboard.press('Tab', {
            dealy: 10
        })
    }

    await page.waitForTimeout(2000);
    let pages = await browser.pages();
    let page2 = await pages[2];

    await page2.waitForSelector('#CustomText')
    for (var i in hsLoca.cocoHS) {
      await hsCode(hsLoca.cocoHS[i])
    }

}

module.exports = {gotoTrass, inputInfo};



//     async function area(located) {
//       await page.waitForSelector('#FILTER3_SELECT_CODE > span > div > button > span')
//       await page.click('#FILTER3_SELECT_CODE > span > div > button > span')
//       await page.click('#FILTER3_SELECT_CODE > span > div > ul > li.multiselect-item.multiselect-filter > div > input')
//       await page.keyboard.press('Backspace', {
//         dealy: 10
//       })
//       await page.keyboard.press('Backspace', {
//         dealy: 10
//       })
//       await page.keyboard.press('Backspace', {
//         dealy: 10
//       })
//       await page.waitForSelector('#FILTER3_SELECT_CODE > span > div > ul > li.multiselect-item.multiselect-filter > div > input')
//       await page.type('#FILTER3_SELECT_CODE > span > div > ul > li.multiselect-item.multiselect-filter > div > input', located)
//       await page.waitForTimeout(1000);
//       await page.keyboard.press('Tab', {
//         dealy: 50
//       })
//       await page.keyboard.press('Space', {
//         dealy: 50
//       })
//       await page.keyboard.press('Tab', {
//         dealy: 10
//       })
//     }

//     await page2.waitForSelector('#CustomText')
//     for (var i in hsCo2) {
//       await hsCode(hsCo2[i])
//     }
//     await page2.click('#wrap > div > div.tb_in_wrap > div > p:nth-child(2) > button')

//     await page.waitForSelector('#LOCATION_TYPE')
//     await page.click('#LOCATION_TYPE')
//     await page.keyboard.press('ArrowDown')
//     await page.keyboard.press('ArrowDown')
//     await page.keyboard.press('Enter')

//     for (var i in loca) {
//       await area(loca[i])
//     }

//     await page.click('#form > div > div:nth-child(1) > div.text-center.m-t-sm > button')
//     await page.waitForSelector('#\\31  > td:nth-child(6)')
//     await page.waitForTimeout(1000)

//     var weight = []
//     var difData = []
//     var clickRow = []
//     var clickDet = []
//     var finalData = []

//     weight = await page.$$eval("[aria-describedby='table_list_1_IM_WGHT']", el => el.map(el => el.title))
//     amount = await page.$$eval("[aria-describedby='table_list_1_IM_AMT']", el => el.map(el => el.title))
//     addDet = await page.$$eval("[aria-describedby='table_list_1_COL3']", el => el.map(el => el.title))
//     country = await page.$$eval("[aria-describedby='table_list_1_COL2']", el => el.map(el => el.title))
//     hs = await page.$$eval("[aria-describedby='table_list_1_COL1']", el => el.map(el => el.title))

//     country_edit = []
//     addDet_edit = []

//     country_edit = await Array.from(new Set(country))
//     addDet_edit = await Array.from(new Set(addDet))
//     hs_edit = await Array.from(new Set(hs))

//     for (i = 0; i < weight.length; i++) {
//       weight[i] = await (weight[i].replace(/,/g, "")) //콤마가 있으면 숫자로 변환이 안되서 제거
//       weight[i] = await Number(weight[i]) //숫자로 변환. 10톤 이상인 것을 추려내기 위해

//       if (weight[i] > 10000) {
//         await clickRow.push(i);
//       }
//     } // 10톤 이상인 행만 추출

//     await page.click('#\\31  > td:nth-child(6) > font')
//     await page.waitForTimeout(2000)
//     let pages2 = await browser.pages()
//     let page3 = await pages2[2]
//     await page.waitForTimeout(5000)
//     await page3.setDefaultTimeout(150000)
//     await page3.waitForSelector('#\\31 > td:nth-child(5)')

//     clickRow.forEach(function (el) { //10톤 이상인것들의 이름을 추출해서 그것의 index를 저장
//       a = hs_edit.indexOf(hs[el]) //hs code의 순서를 확정 했다
//       b = country_edit.indexOf(country[el])
//       c = addDet_edit.indexOf(addDet[el])
//       var d = [a, b, c]
//       clickDet.push(d);
//     }) 

//     for (k = 0; k < clickRow.length; k++) {
//       await page3.click('#SelectCd1')
//       for (i = 0; i < hs_edit.length; i++) {
//         await page3.keyboard.press('ArrowUp', {
//           dealy: 50
//         })
//       }
//       for (i = 0; i < clickDet[k][0]; i++) {
//         await page3.keyboard.press('ArrowDown', {
//           dealy: 50
//         })
//       }
//       await page.keyboard.press('Enter', {
//         dealy: 50
//       })

//       await page3.click('#SelectCd2')
//       for (i = 0; i < country_edit.length; i++) {
//         await page3.keyboard.press('ArrowUp', {
//           dealy: 50
//         })
//       }
//       for (i = 0; i < clickDet[k][1]; i++) {
//         await page3.keyboard.press('ArrowDown', {
//           dealy: 50
//         })
//       }
//       await page3.keyboard.press('Enter', {
//         dealy: 50
//       })

//       await page3.click('#SelectCd3')
//       for (i = 0; i < addDet_edit.length; i++) {
//         await page3.keyboard.press('ArrowUp', {
//           dealy: 50
//         })
//       }
//       for (i = 0; i < clickDet[k][2]; i++) {
//         await page3.keyboard.press('ArrowDown', {
//           dealy: 50
//         })
//       }
//       await page3.keyboard.press('Enter', {
//         dealy: 50
//       })

//       await page3.click('#form > div.text-center.m-t-md > button') //조회하기 클릭
//       await page3.waitForSelector('#\\31 > td:nth-child(5)') // 결과가 나타나길 기다림

//       var a = await page3.$$eval("[aria-describedby='table_list_1_BASE_DATE']", el => el.map(el => el.title))
//       var b = await page3.$$eval("[aria-describedby='table_list_1_IM_AMT']", el => el.map(el => el.title))
//       var c = await page3.$$eval("[aria-describedby='table_list_1_IM_WGHT']", el => el.map(el => el.title))


//       for (var z = 1; z < 15; z++) {
//         if (a[z] === '2019년' || a[z] === '2018년' || a[z] === '2017년') {
//           break
//         }
//       }

//       for (var d = 1; d < z; d++) {
//         if (a[d] === sMonth) {
//           var e = await [hs_edit[clickDet[k][0]], country_edit[clickDet[k][1]], addDet_edit[clickDet[k][2]], a[d], b[d], c[d]]
//           await authorize(creden, e, inputTrass)
//         }
//       }
//     }

//     console.log(await finalData)

//     await page.waitForTimeout(5000)
//     await browser.close();


//   })();