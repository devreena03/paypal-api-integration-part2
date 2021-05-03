var express = require('express');
var request = require('request');
var initialize = require("../config/oauth");

var router = express.Router();
var sanboxUrl = 'https://api.sandbox.paypal.com';

router.post('/create', function(req, res) {
    console.log(req.body);
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: req.body,
        json: true
            
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log(response.body);
            res.json(response.body);
        });
    }, function(err){
        console.log(err);
    });
});

router.post('/capture/:orderId', function(req, res) {
    console.log('inside capture');
    console.log(req.params.orderId);
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders/'+req.params.orderId+'/capture',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Mock-Response':'{"mock_application_codes": "INSTRUMENT_DECLINED"}'
          }          
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.log("in error");
                console.error(err);
                return res.sendStatus(500);
            }
            console.log("in body");
            console.log(response.body);
            res.json({
                'error': 'INSTRUMENT_DECLINED'
            });
        });
    });
});

module.exports = router;