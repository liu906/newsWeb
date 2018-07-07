/**
 * Created by liuxu on 2018/7/3.
 */
var  express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    database : 'NEWSWEB',
    port: 3306
});

var loadParams = {
    newsTitle: '',
    newsPublisher:'',
    newsPublishTime :'',
    newsText:'',
    newsClassID:'',
    newsClassText:'',
    topStoriesItems:''
}

var pool  = mysql.createPool(require('../config/database').mysql);

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("in post");
    var params = req.query;
    var newsID = params.newsID;
    var sql = "select * from news natural join class where newsID = ?;"

    pool.getConnection(function (err, connection) {
        connection.query(sql,[newsID],  function (err, result, next) {
            console.log(result);
            console.log("record length is :" + result.length);
            var recordLength = result.length;
            if (err || recordLength < 1) {
                //res.render('loginError');
                console.log("goto login page again");
                res.redirect('/error');
            }

            else {
                loadParams.newsTitle = result[0].title;
                loadParams.newsPublisher = result[0].publisher;
                loadParams.newsPublishTime = result[0].publishTime;
                loadParams.newsText = result[0].newsText;
                loadParams.newsClassID = result[0].classID;
                loadParams.newsClassText = result[0].classDescription;
                console.log(loadParams);

                console.log("go to post page");


            }
        });

        var topStoriesSql = "select newsID,title,newsPicture,publisher,publishTime from news where classID = 13 or classID = 11 limit 0,4;"

        connection.query(topStoriesSql,function (err, result, next) {
            console.log("in top stories!!!!!!!")
            var recordLength = result.length;
            if (err || recordLength < 1) {
                console.log("hotest sql error");
                //res.redirect('/index');
            }
            else
            {
                loadParams.topStoriesItems = result;
            }
            console.log("loadParams is :::::::::::");
            console.log(loadParams);
            res.render('post',loadParams);
        });

    });

});

module.exports = router;