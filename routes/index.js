var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyRealEstate' });
});

router.get('/home', function(req, res, next) {
  res.render('homepage');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


module.exports = router;
