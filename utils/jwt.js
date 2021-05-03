const jwt  = require('jsonwebtoken');
const crypto=require('crypto');

function authAssertion_email(clientId, merchant_email) {

    var alg = 'none';
    var jsonPartOne = JSON.stringify({'alg':alg});
    var jsonPartTwo = JSON.stringify({'iss':clientId,'email':merchant_email});
   
    var encodedHeaderValue = Buffer.from(jsonPartOne).toString('base64') + '.' +   Buffer.from(jsonPartTwo).toString('base64') + '.';
    return encodedHeaderValue;
 };


function authAssertion_payerid(clientId, payer_id) {

    var alg = 'none';
    var jsonPartOne = JSON.stringify({'alg':alg});
    var jsonPartTwo = JSON.stringify({'iss':clientId,'payer_id':payer_id});
   
    var encodedHeaderValue = Buffer.from(jsonPartOne).toString('base64') + '.' +   Buffer.from(jsonPartTwo).toString('base64') + '.';
    return encodedHeaderValue;
 };

function authAssertion_hs256(clientId, buyer_email) {

var head = {'alg':'HS256','typ':'JWT'};
var body = {'iss':clientId,'email':buyer_email};

    var encodedHeader = Buffer.from(JSON.stringify(head)).toString('base64');
    var encodedPayload = Buffer.from(JSON.stringify(body)).toString('base64');
   
   var token1 = jwt.sign({'iss':clientId,'email':buyer_email}, 'test', { algorithm: 'HS256'});
   
    const private_key="";
    const sign = crypto.createHmac('SHA256', private_key)
    .update(head + '.' + body)
    .digest('base64')

    var token =encodedHeader+"."+encodedPayload+"."+sign

    return token;

    console.log(token1);
  //  console.log(token);
   
};

//var client_id = "AcuuDiWgApKeQx7oY6wuGh2kbAIzy8B1NrruTzVl_vn3Dqv7a-EYGKlHRMb70fjc3eX3EP5rlM3VUp8g"; //india-business
var client_id = "AdEhkNO4a3F4J65NbHFKcZbRCiaZhVUh3chvqPMFzIDp4QmOzKiPIZwnNr_c_BHnVt_VmYgxNSbzkn5_"; //partner-in
var buyer_email = "reena-us-buy@test.com";
var seller_email = "reena-us-business1@test.com";
var seller_payer_id = "YR95EED6QZSU2";

console.log("PayPal-Auth-Assertion =")
console.log(authAssertion_email(client_id, seller_email)); 
//console.log(authAssertion_payerid(client_id, seller_payer_id));
//console.log(authAssertion_hs256(client_id, buyer_email));




