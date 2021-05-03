var express = require("express");
var bodyParser = require('body-parser');

var index = require('./routes/index');
var orderv2 = require('./routes/orderv2');
var orderv1 = require('./routes/oldStack/orderv1');
var ec = require('./routes/oldStack/ec');
var nvp = require('./routes/oldStack/nvp');
var rt = require('./routes/rt')

var app = express();

global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
      extended: true
}));

app.use(express.static(__dirname+'/public'));

app.use('/', index);
app.use('/api/paypal/v2/order', orderv2);
app.use('/api/paypal/v1/order', orderv1);
app.use('/api/paypal/ec', ec);
app.use('/api/paypal/nvp', nvp);
app.use('/api/paypal/rt', rt);

var port = process.env.PORT || '7001';
app.listen(port, function(){
	console.log('server started at port '+ port);
});

