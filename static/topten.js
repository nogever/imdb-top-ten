angular
    .module('IMDBTopTenApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../static/topten-form.html',
                controller: 'TopTenController',
                resolve: {
                    allDates: function(IMDB) {
                        return IMDB.getDates();
                    }
                }
            })
            .otherwise({ redirectTo: '/' });
    }])
    .factory('windowAlert', [
        '$window',
        function($window) {
            return $window.alert;
        }
    ])
    .factory('IMDB', [
        '$http',
        function($http) {
        var sdo = {
            getDates: function() {
              var promise = $http({ 
                method: 'GET', 
                url: '/getDates' 
              });
              promise.success(function(data, status, headers, conf) {
                console.log('hello');
                return data;
              });
              return promise;
            }
          }
        return sdo;
    }])
    .controller('TopTenController', [
        '$scope',
        '$http',
        'windowAlert',
        'allDates',
        function($scope, $http, windowAlert, allDates) {
            $scope.state = {};
            $scope.state.movies = [];
            $scope.state.dates = allDates.data.dates;
            $scope.state.dates.unshift({dates: 'select date'});
            $scope.queriedDate = $scope.state.dates[0];

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
                $scope.getMovies(n);
            };
        }
    ])
    ;





