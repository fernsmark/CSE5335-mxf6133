var express = require('express');
var router = express.Router();


var request = require("request");  //npm install request --save

var result='';
var nearbyPostalCodes= "//api.geonames.org/findNearbyPostalCodesJSON?postalcode=76010&country=US&radius=10&maxRows=10&username=ferns.mark";
request(nearbyPostalCodes, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        // parse the json result
        result = JSON.parse(body);
        console.log(result);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
