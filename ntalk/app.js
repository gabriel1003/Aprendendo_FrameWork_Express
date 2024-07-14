
var express = require('express')
, routes = require('./routes/home');
var app = express();
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use('/', routes); // Usar o router exportado por home.js

app.listen(3000, function() {
  console.log('ntalk no ar!');
  
});
