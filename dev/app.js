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

		$scope.selectedCountry;
		$scope.selectedCountry.capital;
		$scope.selectedCountry.geonameId;
		console.log(selectedCountry);
		console.log(selectedCapital);
		$http.get('http://api.geonames.org/searchJSON?q=' + selectedCapital + '&countryBias=' + selectedCountry + '&orderby=relavance&maxRows=1&username=gvanburen')
		.success(function(searchData){
			console.log(searchData);
			$scope.capitalPop = searchData.geonames[0].population;
			var capitalInfo = $scope.capitalPop;
			console.log(capitalInfo);
			$http.get('http://api.geonames.org/neighboursJSON?geonameId=' + selectedGeo + '&username=gvanburen')
				.success(function(helloNeighbor){
					$scope.neighbors = helloNeighbor.geonames;
					var heyNeigh = $scope.neighbors;
					console.log(heyNeigh);
				})
		})
	}])













