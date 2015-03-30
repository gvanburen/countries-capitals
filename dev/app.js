angular.module('app',['ngRoute','ngAnimate'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: '../dev/pages/home.html',
			controller: 'mainCtrl'
		})
		.when('/countries',{
			templateUrl: '../dev/pages/countries.html',
			controller: 'countryCtrl'
		})
		.when('/countries/:country/capital',{
			templateUrl: '../dev/pages/capital.html',
			controller: 'capitalCtrl'
		});
	}])
	.controller('mainCtrl',['$scope', function($scope){
		$scope.test = "hello";
	}])
	.controller('countryCtrl',['$scope', '$http', function($scope, $http){
		$http.get('http://api.geonames.org/countryInfoJSON?username=gvanburen')
		.success(function(data){
			$scope.countries = data.geonames;
		})
		.error(function(){
			alert("you failed!")
			console.log("bummer");
		})
		$scope.setSelected = function() {
	        $scope.selected = this.countries;
	        console.log($scope.selected);
    	};
	}])
	.controller('capital',['$scope', function($scope){
		$http.get('http://api.geonames.org/searchJSON?q=london&username=gvanburen')
	}])