var express = require('express');
var request = require('request');
var https = require("https");
var router = express.Router();

var config = "USER=india-business_api1.test.com";        

var setExpress = "METHOD=SetExpressCheckout"
                +"&VERSION=109.0"
                +"&PAYMENTREQUEST_0_PAYMENTACTION=SALE"
                +"&L_PAYMENTREQUEST_0_NAME0=Decaf Kona Blend Coffee"
                +"&RETURNURL=https://www.paypal.com/checkoutnow/error"
                +"&CANCELURL=https://www.paypal.com/checkoutnow/error"
                +"&L_PAYMENTREQUEST_0_QTY0=1";

var doExpress = "METHOD=DoExpressCheckoutPayment"
               +"&VERSION=109.0"
               +"&PAYMENTACTION=SALE";

var sanboxUrl = 'https://api-3t.sandbox.paypal.com/nvp ';

router.post('/setExpress', function(req, res) {
    console.log("inside setExpress");
    console.log(req.body);
    var payload = config + "&" + 
                 setExpress + "&PAYMENTREQUEST_0_AMT="+ req.body.amount
                +"&PAYMENTREQUEST_0_CURRENCYCODE=" + req.body.currency
                +"&L_PAYMENTREQUEST_0_AMT0=" + req.body.amount;

    console.log(payload);        

    var options = {
        uri: sanboxUrl,
        method: 'POST',
        body: payload      
    };  
    request(options, function (err, response) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        console.log(response.body);
        res.json(getFormattedBody(response.body));
    });
    
});

router.post('/doExpress', function(req, res) {
    console.log("inside doExpress");
    console.log(req.body);
    var payload = config + "&" + 
               doExpress +"&amt=" + req.body.amount
                +"&payerid=" + req.body.payerId
                +"&CURRENCYCODE=" + req.body.currency
                +"&token=" + req.body.token;

    console.log(payload);        

    var options = {
        uri: sanboxUrl,
        method: 'POST',
        body: payload      
    };  
    request(options, function (err, response) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        console.log(response.body);
        res.json(getFormattedBody(response.body));
    });
    
});

function getFormattedBody (body){
    var arr = body.split("&");
    var obj = {};
    arr.forEach(element => {
        var keyValue = element.split("=");
        obj[keyValue[0]] = keyValue[1];
    });
    console.log(obj);
    return obj;
}

module.exports = router;