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
var pool  = mysql.createPool(require('../config/database').mysql);

var loadParams = {
    hotestNewsID: '',
    hotestNewsTitle:'',
    hotestNewsClassText:'',
    userName:'',

    secondNewsID:'',
    secondNewsTitle:'',
    secondNewsClassText:'',

    thirdNewsID:'',
    thirdNewsTitle:'',
    thirdNewsClassText:'',

    likedList:'',
    topStoriesItems:''

}

/* GET home page. */
router.get('/', function(req, res,next) {
    pool.getConnection(function (err, connection) {
      var hotsetSql = "select count(*) as likedTime,newsID,title,classDescription from news natural join give_like natural join class group by newsID order by likedTime desc;"
        connection.query(hotsetSql,  function (err, result, next) {
            //console.log(result);
            console.log("record length is :" + result.length);

            var recordLength = result.length;
            if (err || recordLength < 1) {
                console.log("hotest sql error");
                //res.redirect('/index');
            }

            else {
                console.log("go to index page");
                loadParams.likedList = result;

                loadParams.hotestNewsID = result[0].newsID;
                loadParams.hotestNewsTitle = result[0].title;
                loadParams.hotestNewsClassText = result[0].classDescription;

                loadParams.secondNewsID = result[1].newsID;
                loadParams.secondNewsTitle = result[1].title;
                loadParams.secondNewsClassText = result[1].classDescription;

                loadParams.thirdNewsID = result[2].newsID;
                loadParams.thirdNewsTitle = result[2].title;
                loadParams.thirdNewsClassText = result[2].classDescription;

                loadParams.userName = 'world';
                //console.log(loadParams);

                // res.render('index', {hotestNewsID: result[0].newsID,hotestNewsTitle:result[0].title,userName:'world'});
                console.log("aaaaaaaaaaaaaaaaaaaa");
                console.log(loadParams);


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
          res.render('index',loadParams);
      });

      connection.release();

    });

});

module.exports = router;

