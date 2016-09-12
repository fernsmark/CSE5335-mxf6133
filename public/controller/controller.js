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
            $http.get("http://api.geonames.org/findNearbyPostalCodesJSON?postalcode="+$scope.getCode+"&country=US&radius=6&maxRows=5&username=ferns.mark")
                .then(function(response) {
                    $scope.postalCodes = response.data.postalCodes;
                    console.log($scope.postalCodes);
                });
        }
        $scope.select = function() {
            this.setSelectionRange(0, this.value.length);
        }
    }]);
