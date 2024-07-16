
var express = require('express');

var homeController = require('./controllers/home');
var contatosController = require('./controllers/contatos')
const path = require('path');
const cookieParser = require('cookie-parser'); // Importe o cookieParser

const app = express();

app.controllers = {
  home: homeController,
  contatos: contatosController
};

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use(cookieParser()); // Use o middleware cookieParser

 app.use(express.static(__dirname + '/public'));

 const routes = require('./routes/home')(app);
 const routesContatos = require('./routes/contatos')(app);

 app.use('/', homeRoutes.get); 
app.use('/', homeRoutes.post.bind(app));
app.use('/contatos', contatosRoutes.get);

app.listen(3000, function() {
  console.log('ntalk no ar!');
});
