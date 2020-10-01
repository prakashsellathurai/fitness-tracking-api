var express = require('express');
const { default: Axios } = require('axios');
var router = express.Router();
const axios = require('axios').default;
// var request = require('requests')
/* GET home page. */
router.get('/', async function (req, res, next) {
  // req.pipe(
  //   axios.post("https://uat.billdesk.com/pgidsk/ProcessPayment", {

    
  //       "MerchantID": "BDSKUATY",
  //       "UniqueTxnID": "ARP10234",
  //       "TxnAmount": "2.00",
  //       "CurrencyType": "INR",
  
  //       "TypeField1": "R",
  //       "SecurityID": "bdskuaty",
  //       "RU": "http://www.merchantwebsite.com/response.jsp"
    
  //     })
  // )
  res.render("index",{"title":"Payment Test"})
});
router.post('/result',async function (req, res, next) {
  console.log(req.body)
  res.render("result")
})
module.exports = router;
