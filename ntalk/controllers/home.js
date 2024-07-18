
module.exports = function(app) {
    

const HomeController = {
    index(req, res) {
      res.render('home/index');
    },
    login(req, res) {
      var email = req.body.usuario.email,
        nome = req.body.usuario.nome;
      if (email && nome) {
        var usuario = req.body.usuario;
        usuario['contatos'] = [];
        req.session.usuario = usuario;
        res.redirect('/contatos');
      } else {
        res.redirect('/');
      }
    },
    logout: function(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
  };

  return HomeController; // Retorna o objeto HomeController apenas uma vez
};
 