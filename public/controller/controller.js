/**
 * Created by Mark on 9/11/2016.
 */
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http',
    function($scope, $http) {
        console.log("Hello World from controller");
        $scope.submit = function(code){
            $scope.getCode = angular.copy(code);
            fetch();
        };
        
        function fetch(){
            $http.get('./geonames.json')
                .then(function(response) {
                    $scope.postalCodes = response.data.postalCodes;
                    console.log($scope.postalCodes);
                });
        }
        /* $scope.select = function() {
            this.setSelectionRange(0, this.value.length);
        }*/
    }]);


myApp.directive('myMap',['$http', function($http) {
    // directive link function
    $http.get('./geonames.json')
        .then(function(response) {
            $scope.postalCodes = response.data.postalCodes;
            console.log($scope.postalCodes);console.log("here");
        });
    var link = function($scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: new google.maps.LatLng($scope.postalCodes[0].lat, $scope.postalCodes[0].lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        // show the map and place some markers
        initMap();

        for (var i = 0, length = $scope.postalCodes.length; i < length; i++) {
            var data = $scope.postalCodes[i];
            setMarker(map, new google.maps.LatLng(data.lat, data.lng), data.postalCode, (data.lat+","+ data.lng));
        }

            /*
             var json = [
             {
             "title": "Stockholm",
             "lat": 32.720368,
             "lng": -97.082576,
             "description": "Stockholm is the capital and the largest city of Sweden and constitutes the most populated urban area in Scandinavia with a population of 2.1 million in the metropolitan area (2010)"
             },
             {
             "title": "Oslo",
             "lat": 32.695425,
             "lng": -97.087556,
             "description": "Oslo is a municipality, and the capital and most populous city of Norway with a metropolitan population of 1,442,318 (as of 2010)."
             },
             {
             "title": "Copenhagen",
             "lat": 32.735687,
             "lng": -97.1080656,
             "description": "Copenhagen is the capital of Denmark and its most populous city, with a metropolitan population of 1,931,467 (as of 1 January 2012)."
             }
             ]

             for (var i = 0, length = json.length; i < length; i++) {
             var data = json[i];
             setMarker(map, new google.maps.LatLng(data.lat, data.lng), 'Arlington', 'Some text');
             }
        setMarker(map, new google.maps.LatLng(32.720368, -97.082576), 'Point A', 'Text 1');
        setMarker(map, new google.maps.LatLng(32.695425, -97.087556), 'Point B', 'Text 2');
        setMarker(map, new google.maps.LatLng(32.735687, -97.1080656), 'Point C', 'Text 3');
*/
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
}]);

/*
myApp.controller('MapCtrl', ['$scope', '$http',
    function($scope, $http) {
        console.log("Hello World from Map controller");
        $http.get('./geonames.json')
            .then(function(response) {
                $scope.postalCodes = response.data.postalCodes;
                console.log($scope.postalCodes);
            });
    }]);
*/
/*
Misc:
 $http.get("//api.geonames.org/findNearbyPostalCodesJSON?postalcode="+$scope.getCode+"&country=US&radius=10&maxRows=10&username=ferns.mark")
 */