const { google } = require('googleapis');
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

    function inputTrass(auth, _inputData) {
        const sheets = google.sheets({
          version: 'v4',
          auth
        });
        const mySpreadSheetId = '1TdrbKRpmPpkL5LY_U0CWp7r8V0DhIV8KbayL-nx3-J0';
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
            } else {
              console.log('%d cells updated.', result.updatedCells);
            }
          });
        });
      };

    module.exports={creden, toke, authorize, inputTrass};