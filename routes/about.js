var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about',
            {author: 'Mark Ashley Fernandes', page_name:'About' });
});

module.exports = router;
