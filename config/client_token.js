var request = require('request');
var sanboxUrl = 'https://api.sandbox.paypal.com';
//var clientId = "AREKeT1dmLLv69tqifVLs5W71mwKR16MkTZDSCII-YAHjKcsNH6XvaahUMn_3QQyLMK34QdQRmC7s12g"; //reena-us-business

var clientId = "ASg-knvLDXcoBlccN8-ErY4jvlRE7Lz1_ftYw7CKAtkAG2K7peRfqVfPq6eNa8PbXVomUTmPutsMfVnS"; //order-india
var secret = "";

var basicAuth = new Buffer(clientId+":"+secret).toString('base64') ;

var initialize = function(){  
    var options = {
        uri: sanboxUrl + '/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+basicAuth
        },
        body: "grant_type=client_credentials&response_type=token&return_authn_schemes=true"
            
    }; 
    return new Promise(function(resolve, reject) { 
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                reject(err);
            }
            var access_token = JSON.parse(response.body).access_token; 
            console.log(access_token);
            resolve(access_token);
        });
    });
};

module.exports = initialize;