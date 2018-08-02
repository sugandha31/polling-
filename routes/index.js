var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/api/users',users.getUsers);
router.post('/api/signup',users.signup);
router.get('/api/login',users.login);

module.exports = router;