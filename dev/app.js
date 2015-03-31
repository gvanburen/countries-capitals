angular.module('app',['ngRoute','ngAnimate'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: '../dev/pages/home.html',
			controller: 'mainCtrl'
		})
		.when('/countries',{
			templateUrl: '../dev/pages/countries.html',
			controller: 'countryCtrl as alias'
		})
		.when('/countries/:country/capital',{
			templateUrl: '../dev/pages/capital.html',
			controller: 'capitalCtrl'
		})
		.when('/error', {
			template: '<p>There was an error</p>'
		})
		.otherwise('/error');
	}])
	.controller('mainCtrl',['$scope', function($scope){

	}])
	.controller('countryCtrl',['$rootScope','$scope', '$http', '$location', function($rootScope, $scope, $http, $location){
		$http.get('http://api.geonames.org/countryInfoJSON?username=gvanburen')
		.success(function(data){
			$rootScope.countries = data.geonames;
		})
		.error(function(){
		})
		//get url to update to country selected
		$scope.go = function() {
			$scope.go = function(url){
				$location.path('countries/' + url + '/capital');
			}
		}
	}])
	.controller('capital',['$rootScope', '$scope', function($routeScope, $scope){
		//http for neighbors and capital
	}])