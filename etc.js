const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { SSL_OP_CIPHER_SERVER_PREFERENCE } = require('constants');
require('dotenv').config();

const creden = {
  "installed": {
      "client_id": process.env.CLIENT_ID,
      "project_id": process.env.PROJECT_ID,
      "auth_uri": process.env.AUTH_URI,
      "token_uri": process.env.TOKEN_URI,
      "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
      "client_secret": process.env.CLIENT_SECRET,
      "redirect_uris": process.env.REDIRECT_URIS
  }
};

const toke = {
  "access_token": process.env.ACCESS_TOKEN,
  "refresh_token": process.env.REFRESH_TOKEN,
  "scope": "https://www.googleapis.com/auth/spreadsheets",
  "token_type": "Bearer",
  "expiry_date": 1598260908685
  };

  function authorize(credentials, param2, callback) {
    const {
      client_secret,
      client_id,
      redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    
      oAuth2Client.setCredentials(toke);
      callback(oAuth2Client, param2);
  }


function inputTrass(auth, _inputData){
const sheets =  google.sheets({
  version: 'v4',
  auth
});
const mySpreadSheetId =  '1TdrbKRpmPpkL5LY_U0CWp7r8V0DhIV8KbayL-nx3-J0';
const sheetName = 'input';

sheets.spreadsheets.values.get({
  spreadsheetId: mySpreadSheetId,
  range: `${sheetName}!A:A`,
}, (err, res) => {
  if (err)
    return console.log('The API returned an error: ' + err);
  const data = res.data.values;
  let i = data.length;
  console.log(i);

  sheets.spreadsheets.values.update({
    spreadsheetId: mySpreadSheetId,
    range: `${sheetName}!A${i + 1}`,
    valueInputOption: "USER_ENTERED",
    resource: {
      majorDimension: "ROWS",
      values: [
        //[date, wri, amount, content]
        _inputData          
      ]
    }
  }, (err, result) => {
    if (err) {
      // Handle error
      console.log(err);
    }
    else {
      console.log('%d cells updated.', result.updatedCells);
    }
  });
});
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 20
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1000,
  })

  //////////////////////////// 조회할 월 입력
  var month = '         11월'
  //////////////////////////// 조회할 월 입력

  await page.goto('https://www.bandtrass.or.kr/index.do');
  await page.waitForSelector('#landing_navigation > div > div:nth-child(3) > div > ul.navi_login > a:nth-child(1) > li')
  await page.click('#landing_navigation > div > div:nth-child(3) > div > ul.navi_login > a:nth-child(1) > li')
  await page.waitForSelector('#id')
  await page.type('#id', 'hanpel')
  await page.type('#pw', 'hp08140814')
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
  //팝업에서 실행

  await page.waitForTimeout(2000);
  let pages = await browser.pages();
  let page2 = await pages[2];

  hsCo2 = ["2102201000","2106109020"];
   
  loca = ['성남','문경','익산','논산','청주','강동','금천','수원','용인'] 

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

  await page2.waitForSelector('#CustomText')
  for (var i in hsCo2) {
    await hsCode(hsCo2[i])
  }
  await page2.click('#wrap > div > div.tb_in_wrap > div > p:nth-child(2) > button')

  await page.waitForSelector('#LOCATION_TYPE')
  await page.click('#LOCATION_TYPE')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  for (var i in loca) {
    await area(loca[i])
  }

  await page.click('#form > div > div:nth-child(1) > div.text-center.m-t-sm > button')
  await page.waitForSelector('#\\31  > td:nth-child(6)')
  await page.waitForTimeout(1000)

  var weight = []
  var difData = []
  var clickRow = []
  var clickDet = []
  var finalData = []

  weight = await page.$$eval("[aria-describedby='table_list_1_IM_WGHT']", el => el.map(el => el.title))
  amount = await page.$$eval("[aria-describedby='table_list_1_IM_AMT']", el => el.map(el => el.title))
  addDet = await page.$$eval("[aria-describedby='table_list_1_COL3']", el => el.map(el => el.title))
  country = await page.$$eval("[aria-describedby='table_list_1_COL2']", el => el.map(el => el.title))
  hs = await page.$$eval("[aria-describedby='table_list_1_COL1']", el => el.map(el => el.title))
  
  country_edit = []
  addDet_edit = []

/*   for(var i = 0; i < hs.length; i++){
    if(hs[i] != hs[i+1]){
      difData.push(i+1)
    }
  } */
  
  
  /* for(var i = 0; i < difData.length; i++){
   var a = await country.slice(difData[i-1], difData[i])
   var a = await Array.from(new Set(a))
   var a = await a.sort()
   await country_edit.push(a)

   var b = await addDet.slice(difData[i-1], difData[i])
   var b = await Array.from(new Set(b))
   var b = await b.sort()
   await addDet_edit.push(b)
  } */

  country_edit = await Array.from(new Set(country))
  addDet_edit = await Array.from(new Set(addDet))
  hs_edit = await Array.from(new Set(hs))

  for (i = 0; i < weight.length; i++) {
    weight[i] = await (weight[i].replace(/,/g, "")) //콤마가 있으면 숫자로 변환이 안되서 제거
    weight[i] = await Number(weight[i]) //숫자로 변환. 10톤 이상인 것을 추려내기 위해

    if (weight[i] > 10000) {
      await clickRow.push(i);
    }
  } // 10톤 이상인 행만 추출

  await page.click('#\\31  > td:nth-child(6) > font')
  await page.waitForTimeout(2000)
  let pages2 = await browser.pages()
  let page3 = await pages2[2]
  await page.waitForTimeout(5000)
  await page3.setDefaultTimeout(150000)
  await page3.waitForSelector('#\\31 > td:nth-child(5)')

  clickRow.forEach(function (el) { //10톤 이상인것들의 이름을 추출해서 그것의 index를 저장
    a = hs_edit.indexOf(hs[el]) //hs code의 순서를 확정 했다
    b = country_edit.indexOf(country[el])
    c = addDet_edit.indexOf(addDet[el])
    var d = [a, b, c]
    clickDet.push(d);
  }) 
  
  for (k = 0; k < clickRow.length; k++) {
    await page3.click('#SelectCd1')
    for (i = 0; i < hs_edit.length; i++) {
      await page3.keyboard.press('ArrowUp', {
        dealy: 50
      })
    }
    for (i = 0; i < clickDet[k][0]; i++) {
      await page3.keyboard.press('ArrowDown', {
        dealy: 50
      })
    }
    await page.keyboard.press('Enter', {
      dealy: 50
    })

    await page3.click('#SelectCd2')
    for (i = 0; i < country_edit.length; i++) {
      await page3.keyboard.press('ArrowUp', {
        dealy: 50
      })
    }
    for (i = 0; i < clickDet[k][1]; i++) {
      await page3.keyboard.press('ArrowDown', {
        dealy: 50
      })
    }
    await page3.keyboard.press('Enter', {
      dealy: 50
    })

    await page3.click('#SelectCd3')
    for (i = 0; i < addDet_edit.length; i++) {
      await page3.keyboard.press('ArrowUp', {
        dealy: 50
      })
    }
    for (i = 0; i < clickDet[k][2]; i++) {
      await page3.keyboard.press('ArrowDown', {
        dealy: 50
      })
    }
    await page3.keyboard.press('Enter', {
      dealy: 50
    })

    await page3.click('#form > div.text-center.m-t-md > button') //조회하기 클릭
    await page3.waitForSelector('#\\31 > td:nth-child(5)') // 결과가 나타나길 기다림

    var a = await page3.$$eval("[aria-describedby='table_list_1_BASE_DATE']", el => el.map(el => el.title))
    var b = await page3.$$eval("[aria-describedby='table_list_1_IM_AMT']", el => el.map(el => el.title))
    var c = await page3.$$eval("[aria-describedby='table_list_1_IM_WGHT']", el => el.map(el => el.title))


    for (var z = 1; z < 15; z++) {
      if (a[z] === '2019년' || a[z] === '2018년' || a[z] === '2017년') {
        break
      }
    }

    for (var d = 1; d < z; d++) {
      if (a[d] === month) {
        var e = await [hs_edit[clickDet[k][0]], country_edit[clickDet[k][1]], addDet_edit[clickDet[k][2]], a[d], b[d], c[d]]
        //await finalData.push(e);
        await authorize(creden, e, inputTrass)
      }
    }
  }

  console.log(await finalData)

  await page.waitForTimeout(5000)
  await browser.close();
  

})();

  

 

// * 중량이 10,000이 넘는 것만 array에 집어넣는ㄴ다
// array에 넣을 것은 hs code, 국가, 지역
// 각각을 클릭하게 하고 조회로 고고
// 2020년 클릭
// 드래그
// 복붙
