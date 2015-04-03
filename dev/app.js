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
		.when('/countries/:country/:capital',{
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
	.controller('countryCtrl',['$rootScope','$scope', '$http', '$location', '$templateCache', function($rootScope, $scope, $http, $location, $templateCache){
		$templateCache.put('countries.html');
		$http.get('http://api.geonames.org/countryInfoJSON?username=gvanburen')
		.success(function(data){
			$rootScope.countries = data.geonames;
		})
		.error(function(){
			$location.path('/error')
		})
	}])
	.controller('capitalCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
		//http for neighbors and capital
		$scope.country = $routeParams.country;
		$scope.capital = $routeParams.capital;

		console.log(selectedCountry);
		console.log(selectedCapital);
		$http.get('http://api.geonames.org/searchJSON?q=' + $scope.capital + '&countryBias=' + $scope.country + '&orderby=relavance&maxRows=1&username=gvanburen')
		.success(function(searchData){
			$scope.countryCode = searchData.geonames[0].countryCode;
			$scope.capitalPop = searchData.geonames[0].population;
			$http.get('http://api.geonames.org/neighboursJSON?country=' + $scope.countryCode + '&username=gvanburen')
				.success(function(helloNeighbor){
					$scope.neighbors = helloNeighbor.geonames;
					var heyNeigh = $scope.neighbors;
					console.log(heyNeigh);
				})
		})
	}])













