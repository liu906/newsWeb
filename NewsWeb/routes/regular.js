/**
 * Created by liuxu on 2018/7/3.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('regular', { title: 'Express' });
});

module.exports = router;