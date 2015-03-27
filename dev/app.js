angular.module('app',['ngRoute','ngAnimate'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: './pages/home.html',
			controller: 'mainCtrl'
		})
		.when('/countries',{
			templateUrl: './pages/countries.html',
			controller: 'countryCtrl'
		})
		.when('/countries/:country/capital',{
			templateUrl: './pages/capital.html',
			controller: 'capitalCtrl'
		})
	}])
	.controller('mainCtrl',['$scope', function($scope){
		$scope.test = "hello";
		}
	])
	// .controller('countryCtrl',['$scope', function($scope){

	// }])
	// .controller('capital',['$scope', function($scope){

	// }])