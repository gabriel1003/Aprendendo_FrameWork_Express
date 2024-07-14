
var express = require('express');
var router = express.Router();
const path = require('path'); // Importe o módulo 'path'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/views/home.html'));
});

module.exports = router;
