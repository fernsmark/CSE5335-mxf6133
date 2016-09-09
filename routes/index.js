var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',
      {author: 'Mark Ashley Fernandes', page_name:'Home' });
});

module.exports = router;
