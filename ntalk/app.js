
const express = require('express');

const homeController = require('./controllers/home');
const contatosController = require('./controllers/contatos')
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

 const homeRoutes = require('./routes/home')(app);
const contatosRoutes = require('./routes/contatos')(app);

app.use('/', homeRoutes.get); // Registra as rotas GET de home
app.use('/', homeRoutes.post); // Registra as rotas POST de home
app.use('/', contatosRoutes.get); // Registra as rotas GET de contatos

app.listen(3000, function() {
  console.log('ntalk no ar!');
});
