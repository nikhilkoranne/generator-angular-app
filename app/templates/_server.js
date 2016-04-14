var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../client')));
app.use('/vendor', express.static(__dirname + '/../../vendor'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./auth/auth')(app);

app.get('/', function (req, res) {
    res.render('index.html');
});

var server = app.listen(9001, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Status Report app listening at http://%s:%s', host, port);
});
