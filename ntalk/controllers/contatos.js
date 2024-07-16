
module.exports = function(app) {
    return {
      index: function(req, res) {
        var usuario = req.session.usuario;
        if (!usuario) {
            res.redirect('/');
            return;
          }
          params = { usuario: usuario };
        res.render('contatos/index', params);
      }
    };
  };
  