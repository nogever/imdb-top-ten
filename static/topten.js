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
            $scope.dates = [];
            // $scope.addItem = function() {
            //     if (!$scope.state.newItem) {
            //         windowAlert("text field must be non-empty");
            //     } else {
            //         $http
            //             .post('/todoAdd', {
            //                 item: $scope.state.newItem
            //             })
            //             .success(function(data, status, headers, config) {
            //                 if (data.success) {
            //                     $scope.retrieveLastNItems(
            //                         $scope.state.retrieveNr
            //                     );
            //                 } else {
            //                     windowAlert('Adding of item failed');
            //                 }
            //             })
            //             .error(function(data, status, headers, config) {
            //             });
            //     }
            // };

            $scope.getDates = function() {
                $http
                    .get('/getD')
                    .success(function(data) {
                        $scope.dates = data.dates;
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

            $scope.getTopTenOfDay = function(n) {
                $scope.qday = n;
                $scope.getMovies($scope.qday);
            };
        }
    ])
    ;





