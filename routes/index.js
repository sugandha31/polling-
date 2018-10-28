var express = require('express');
var router = express.Router();
var users = require('../controllers/users');
var poll = require('../controllers/poll');
var pollCategory = require('../controllers/pollCategory');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});
/*
Get Request to get all users for admin
*/
router.get('/api/users', users.getUsers);
/*
@BodyParam {email,user_name,password,name}
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
@BodyParam {email,oldPassword,newPassword}
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
/*
@QueryParam {approve,poll_id}
*/
router.get('/api/approvepoll', poll.approvePoll);
/*
Get Request to get all polls for dashboard
*/
router.get('/api/getAllPolls', poll.getAllPolls);
/*
@QueryParam {userId}
*/
router.get('/api/getUserCategory',pollCategory.getUserPreferenceCategory)
/*
Get Request to get all category
*/
router.get('/api/getAllCategory',pollCategory.getAllCategory)
/*
@BodyParam {user_id,cat_id}
*/
router.post('/api/addCategory',pollCategory.addCategory);
module.exports = router;