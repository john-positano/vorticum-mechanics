var express = require('express');
var fs = require('fs');

var serverStack = express();
var port = process.argv[2] || 9000;

serverStack.use( '/scripts', express.static( __dirname + '/scripts') );
serverStack.use( '/node_modules', express.static( __dirname + '/node_modules' ) );
serverStack.use( '/', express.static( __dirname + '/views' ) );

serverStack.listen(port, function () {
  console.log(`Server running on ${!process.argv[2] ? 'DEFAULT ' : ''}port ${port}`);
});