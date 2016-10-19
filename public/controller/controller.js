/**
 * Created by Mark on 9/11/2016.
 * AngularJS reference: https://www.youtube.com/watch?v=ofASsumsf7E&list=PLEDbaVSIL58MB78qU6_I_FZZgNe_Mcb5j
 * Google Maps reference: http://www.marthijnvandenheuvel.com/2014/05/07/create-an-angularjs-google-maps-directive/
 */
var myApp = angular.module('myApp',[]);
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


myApp.directive('myMap', function($http) {
    // directive link function

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
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});

myApp.controller('mainCtrl', function AppCtrl ($scope) {

    //Preparing list for Chart
    //var chartData = $scope.postalCodes;
    var listData= [];
    var listLabels= [];
//        var listSeries= ["Distance from "];

    for (var i = 1, length = $scope.postalCodes.length; i < length; i++) {
        var bar = $scope.postalCodes[i];
        listData.push(parseFloat(bar.distance));
        listLabels.push(bar.postalCode);
        //else
        //   listSeries.push(bar.postalCode);
    }

    console.log(listData);
    console.log(listLabels);

    $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
    $scope.data = listData; //[1, 2, 3, 4];
    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };
    $scope.barValue = 'None';
})
myApp.directive('barChart', function(){
        var chart = d3.custom.barChart();
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope:{
                height: '=height',
                data: '=data',
                hovered: '&hovered'
            },
            link: function(scope, element, attrs) {
                var chartEl = d3.select(element[0]);
                chart.on('customHover', function(d, i){
                    scope.hovered({args:d});
                });

                scope.$watch('data', function (newVal, oldVal) {
                    chartEl.datum(newVal).call(chart);
                });

                scope.$watch('height', function(d, i){
                    chartEl.call(chart.height(scope.height));
                })
            }
        }
    })
myApp.directive('chartForm', function(){
        return {
            restrict: 'E',
            template:
            '<br />Hover to view the distance. Distance: {{barValue}} miles </div>'
        }
    });
/*

*/