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
                    },
                    allMovies: function(IMDB) {
                        return IMDB.getMovies();
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
                return data;
              });
              return promise;
            },
            getMovies: function() {
                var promise = $http({
                    method: 'GET',
                    url: '/getTop'
                });
                promise.success(function(data, status, headers, conf) {
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
        'allMovies',
        function($scope, $http, windowAlert, allDates, allMovies) {
            $scope.state = {};
            $scope.state.movies = allMovies.data.movies;
            $scope.state.dates = allDates.data.dates;
            $scope.queriedDate = $scope.state.dates[0];
            window.localStorage['allMovies'] = angular.toJson(allMovies.data.movies);

            $scope.getMovies = function() {
                $scope.state.movies = window.localStorage['allMovies'];
            };

            $scope.getMoviesOfDay = function(n) {
                var allMovies = window.localStorage['allMovies'];
                var allDates = $scope.state.dates;
                var qDay = $scope.queriedDate;
                var qDayId; 
                var moviesOfDay = [];
                for (var d = 0; d < allDates.length; d += 1) {
                    if (allDates[d]['dates'] == qDay) {
                        qDayId = allDates[d]['id'];
                    }
                }
                for (var i = 0; i < allMovies.length; i += 1) {
                    if (allMovies[i]['date_id'] == qDayId) {
                        moviesOfDay.push(allMovies[i]);
                    }
                }
            }
        }
    ]);





