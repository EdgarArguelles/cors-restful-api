var express = require('express');

var app = express.createServer(express.logger());
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 5000);