
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');
const homeController = require('./controllers/home');
const contatosController = require('./controllers/contatos');

const app = express();

// Configurações
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('ntalk'));
app.use(session({
    secret: 'ntalk',
    resave: false, 
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

//Controllers
app.controllers = {
  home: homeController(app),
  contatos: contatosController(app)
};

// Rotas

 const homeRoutes = require('./routes/home')(app);
const contatosRoutes = require('./routes/contatos')(app);

app.use('/', homeController);
app.use('/', contatosController);
app.use(error.notFound); // Middleware para página 404
app.use(error.serverError); // Middleware para erros do servidor
// Iniciar o servidor
app.listen(3000, () => {
  console.log('ntalk no ar!');
});
 