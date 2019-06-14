const fetch = require('node-fetch')

const alertURL = "http://42.cosmethics.com/p/alerts";
const barcodeURL = "http://42.cosmethics.com/p/"
const productBarcodes = ["3605521556028", "0716237090089", "7702018868902"];
let productlist = [];

// compare product INCI against alerts to decide the appropriate alert
function checkInci(inciArr, alerts){
  var checkInitAlert = "";
  var highConcern  = alerts['High Concern!'];
  var plasticAlert = alerts['Plastics Alert!'];
  
  for(let i = 0; i < inciArr.length; i++)
  {
      for(let j = 0; j < highConcern.length; j++)
      {
          if (inciArr[i] == highConcern[j]){
              checkInitAlert = "High Concern!";
              return checkInitAlert;
          }
      }
      for(let k = 0; k < plasticAlert.length; k++)
      {
          if (inciArr[i] == plasticAlert[k]){
              checkInitAlert = "Plastics Alert!";
              return checkInitAlert;
          }
      }
  }
  checkInitAlert = "Safe";
  return checkInitAlert;
}

function getAlerts(){
  return new Promise((resolve, reject) => {
    fetch(alertURL)
      .then(res => res.json())
      .then(res => {
            resolve(res)
      })
      .catch(err => { reject(err) })
  });
}

function getProduct(producturl,alerts) {
  return new Promise((resolve, reject) => {
    fetch(producturl)
      .then(res => res.json())
      .then(product => {
          product.alert = checkInci(product.INCI, alerts);
          resolve(product)
      })
      .catch(err => { reject(err) })
  });
}
export default async function finalProductList(cb) {
  const alerts = await getAlerts();
  for(let i = 0; i < productBarcodes.length; i++)
  {
      const value = await getProduct(barcodeURL+productBarcodes[i], alerts);
      productlist.push(value);
      cb(productlist);
  }
}

