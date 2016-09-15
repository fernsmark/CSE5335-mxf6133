var express = require('express');
var router = express.Router();
var description= "Developed by Mark Ashley Fernandes.";


var request = require("request");  //npm install request --save
var fs = require('fs');
var result='';
var nearbyPostalCodes= "http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=76010&country=US&radius=10&maxRows=11&username=ferns.mark";
request(nearbyPostalCodes, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        // parse the json result, http://codesamplez.com/programming/using-json-in-node-js-javascript
        result = JSON.stringify(body,null,2);
        result = JSON.parse(result);
        console.log(result);
        fs.writeFile('./public/geonames.json', result, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'State-of-the-art Web Application', description: description });
});

module.exports = router;
