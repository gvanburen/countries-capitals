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
		.when('/countries/:country',{
			templateUrl: '../dev/pages/capital.html',
			controller: 'capitalCtrl'
		})
		.when('/error', {
			template: '<p>There was an error</p>'
		})
		.otherwise('/error');
	}])
	.run(function($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path("/error");
	    });
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      },50);
    	});
	})
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
		$scope.go = function(url){
			$location.path('/countries/' + url)
		}
	}])
	.controller('capitalCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope){
		//http for neighbors and capital
		$scope.country = $routeParams.country;

		$http.get('http://api.geonames.org/countryInfoJSON?country=' + $scope.country + '&username=gvanburen')
		.success(function(results){
			console.log(results);
			$scope.selectedCountry = results.geonames[0];
			$http.get('http://api.geonames.org/searchJSON?q=' + $scope.selectedCountry.capital + '&countryBias=' + $scope.country + '&orderby=relavance&maxRows=1&username=gvanburen')
			.success(function(searchData){
				$scope.capitalPop = searchData.geonames[0].population;
				$http.get('http://api.geonames.org/neighboursJSON?country=' + $scope.country + '&username=gvanburen')
					.success(function(helloNeighbor){
						$scope.neighbors = helloNeighbor.geonames;
						var heyNeigh = $scope.neighbors;
						console.log(heyNeigh);
					})
			})
		})
	}])


