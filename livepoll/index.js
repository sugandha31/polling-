var express = require('express');
var app = express();
var http = require('http').Server(app);
var server = require('socket.io')(http);
var livemodel = require('../models/livePoll');

var port = 8080;
var pos_counter = 0;//Initial counter value 
var neg_counter = 0;//Initial counter value 
var userid = '';
var db_user_id = '';
var db_pos_count = '';
var db_neg_count = '';
var db_poll_id = '';
var ques = '';

app.get('/livepoll', function (req, res) {
    userid = req.query.userid;
    res.sendFile(__dirname + '/index.html');
    livemodel.live_poll(userid, function (err, data) {
        if (!err) {
            console.log(data);
            db_poll_id = data[0].id;
            db_user_id = data[0].user_id;
            db_pos_count = data[0].pos_count;
            db_neg_count = data[0].neg_count;
            ques = data[0].poll;
        } else {
        }
    });

});
server.on('connection', function (socket) {
    console.log('a user connected');



    //on user connected sends the current click count
    socket.emit('ques_poll', ques);
    socket.emit('pos_click_count', { userid: userid, count: db_pos_count });
    socket.emit('neg_click_count', { userid: userid, count: db_neg_count });

    //when user click the button
    socket.on('plus_clicked', function (data) {
        pos_counter = parseInt(data.count);
        pos_counter += 1;//increments positive global click count
        data.count = pos_counter;
        livemodel.updateCount(pos_counter, neg_counter, db_poll_id, function (err, retdata) {
            if (retdata) {
                server.emit('pos_click_count', data);//send to all users new counter value
            } else {
                //Todo handle error
                console.log("Don't be a jerk.. Unable to update");

            }
        });
    });


    socket.on('minus_clicked', function (data) {
        neg_counter = parseInt(data.count);
        neg_counter += 1;//increments negative global click count
        data.count = neg_counter;
        livemodel.updateCount(pos_counter, neg_counter, db_poll_id, function (err, retdata) {
            if (retdata) {
                server.emit('neg_click_count', data);//send to all users new counter value
            } else {
                //Todo handle error
                console.log("Don't be a jerk.. Unable to update");
            }
        });
    });

});

    //starting server
    http.listen(port, function () {
        console.log('listening on port:' + port);
    });