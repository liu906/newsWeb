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

/* GET category page. */
router.get('/', function(req, res,next) {
    pool.getConnection(function (err, connection) {

        var classID = req.query.classID;
        console.log("classId is "+classID);

        var categorySql = "select newsID,title,newsPicture,publisher,publishTime from news where classID = ?;";
        var items;
        connection.query(categorySql,[classID],  function (err, result, next) {

            var recordLength = result.length;
            if (err || recordLength < 1) {
                console.log("hotest sql error");
                res.redirect('/error');
            }

            else {
                console.log("length = "+result.length);
                items = result;



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
                res.render('category',{allNewsInClass:items,topStoriesItems:result});
            }

        });

        connection.release();


    });

});

module.exports = router;
