
var express = require('express');

var homeController = require('./controllers/home');
var contatosController = require('./controllers/contatos')
const path = require('path');
const cookieParser = require('cookie-parser'); // Importe o cookieParser

const app = express();

app.controllers = {
  home: homeController(),
  contatos: contatosController()
};

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use(cookieParser()); // Use o middleware cookieParser

 app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
  console.log('ntalk no ar!');
});
