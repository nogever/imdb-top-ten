angular
    .module('IMDBTopTenApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../static/topten-form.html',
                controller: 'TopTenController'
            })
            .when('/secondPage', {
                templateUrl: '../static/secondPage.html',
                controller: 'SecondController'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .factory('windowAlert', [
        '$window',
        function($window) {
            return $window.alert;
        }
    ])
    .controller('TopTenController', [
        '$scope',
        '$http',
        'windowAlert',
        function($scope, $http, windowAlert) {
            $scope.state = {};
            $scope.state.movies = [];
            $scope.qday = null;
            $scope.state.dates = [];

            $scope.getDates = function() {
                $http
                    .get('/getDates')
                    .success(function(data) {
                        $scope.state.dates = data.dates;
                    })
                    .error(function() {
                        windowAlert("Retrieval failed");
                    });
            };

            $scope.getMovies = function() {
                $http
                    .get('/getTop')
                    .success(function(data) {
                        $scope.state.movies = data.movies;
                    })
                    .error(function() {
                        windowAlert("Retrieval failed");
                    });
            };

            $scope.getAllDates = function() {
                $scope.getDates();
                console.log($scope.state.dates);
            };

            $scope.getTopTenOfDay = function(n) {
                $scope.qday = n;
                $scope.getMovies($scope.qday);
            };
        }
    ])
    ;





