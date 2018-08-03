var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var poll = require('../controllers/poll');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', users.getUsers);
/*
@BodyParam {email,user_name,password}
*/
router.post('/api/signup', users.signup);
/*
@BodyParam {email,password}
*/
router.post('/api/login', users.login);
/*
@QueryParam {email}
*/
router.get('/api/logout', users.logout);
/*
@BodyParam {email,password}
*/
router.post('/api/changepassword', users.changePassword);
/*
@BodyParam {userID,poll,is_anony,cat_id,option}
*/
router.post('/api/createpoll', poll.create_poll);
/*
@QueryParam {poll}
*/
router.get('/api/checksimilarpoll', poll.checkSimilar);

module.exports = router;