
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');
const homeController = require('./controllers/home');
const contatosController = require('./controllers/contatos');
const chatController = require('./controllers/chat');
const Redis = require('ioredis');
const mongoose = require('mongoose');
const cookie = require('cookie');
const connectRedis = require('connect-redis');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configuração Redis 
let redisClient = new Redis({
  host: '172.17.0.2',
  port: 6379
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const RedisStore = connectRedis(session);

let store = new RedisStore({ client: redisClient });

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('ntalk'));
app.use(session({
  secret: 'ntalk',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

// Middleware para gerenciar sessões de socket
io.use((socket, next) => {
  const cookieData = socket.request.headers.cookie;
  const cookieObj = cookie.parse(cookieData);
  const sessionHash = cookieObj['connect.sid'] || ''; 
  const sessionID = sessionHash.split('.')[0].slice(2);
  store.get(sessionID, (err, session) => {
    if (err || !session) {
      return next(new Error('Acesso negado!'));
    }
    socket.handshake.session = session;
    return next();
  });
});

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/ntalk') 
  .then(async () => {
    console.log('Conectado ao MongoDB');

    // Carregar o modelo de usuário APÓS a conexão ser estabelecida
    const Usuario = require('./models/usuario');

    app.models = { usuario: Usuario };
    
    //Controllers
    app.controllers = {
      home: homeController(app),
      contatos: contatosController(app),
      chat: chatController(app)
    };

    // Rotas
    const homeRoutes = require('./routes/home')(app);
    const contatosRoutes = require('./routes/contatos')(app);
    const chatRoutes = require('./routes/chat')(app);

    });
    
    // Tratamento de erros

    app.use(error.notFound); 
    app.use(error.serverError); 

    // Iniciar o servidor
    http.listen(3000, () => {
      console.log('ntalk no ar!');
    });
  