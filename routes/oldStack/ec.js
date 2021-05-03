var express = require('express');
var request = require('request');
var initialize = require("../../config/oauth");

var router = express.Router();
var sanboxUrl = 'https://api.sandbox.paypal.com';

router.post('/create-payment', function(req, res){
    console.log("create");
    var options = {
        uri: sanboxUrl + '/v1/payments/payment',
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
            console.log(response);
            res.json(response.body);
        });
    }, function(err){
        console.log(err);
    });
});

var executePayment = function(payment, callback){

    var options = {
        uri: sanboxUrl + '/v1/payments/payment/'+payment.paymentID+'/execute',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: {
           "payer_id": payment.payerID
        },
        json: true
            
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(response);
            callback(response);
        });
    }, function(err){
        console.log(err);
    });

};

router.get('/payment/:id', function(req, res){
    console.log("get details :"+req.params.id);
    var options = {
        uri: sanboxUrl + '/v1/payments/payment'+req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          }
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
    });
});

router.patch('/payment/:id', function(req, res){
    console.log("payment id  :"+req.params.id);
    console.log(req.body);
    var options = {
        uri: sanboxUrl + '/v1/payments/payment/'+req.params.id,
        method: 'PATCH',
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
    });
});

//comming from payment-sdk execute 
router.post('/execute-payment', function(req, res){
    executePayment(req.body,function(response){
        res.status(response.statusCode);
        res.send(response.body); 
    })
});

module.exports = router;