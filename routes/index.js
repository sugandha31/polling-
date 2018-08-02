var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users',users.getUsers);
/*
@BodyParam {email,user_name,password}
*/
router.post('/api/signup',users.signup);
/*
@BodyParam {email,password}
*/
router.post('/api/login',users.login);
/*
@QueryParam {email}
*/
router.get('/api/logout',users.logout);
/*
@BodyParam {email,password}
*/
router.post('/api/changepassword',users.changePassword);
module.exports = router;