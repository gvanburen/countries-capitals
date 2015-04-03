var viewsModule = angular.module('viewApp',['ngRoute'])
viewsModule.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: '../dev/pages/home.html',
		controller: 'mainCtrl'
	})
	.when('/countries',{
		templateUrl: '../dev/pages/countries.html',
		controller: 'countryCtrl'
	})
	.when('/countries/:country', {
		templateUrl: '../dev/pages/capital.html',
		controller: 'capitalCtrlTest',
		resolve: {
			countryDetails: ['findCountry', '$route', function(findCountry, $route){
				return fincCountry($route.current.params.country);
			}]
		}
	});
}]);

viewsModule.controller('countryCtrl',['$rootScope','$scope', '$http', '$location', '$templateCache', function($rootScope, $scope, $http, $location, $templateCache){
		$templateCache.put('countries.html');
		$http.get('http://api.geonames.org/countryInfoJSON?username=gvanburen')
		.success(function(data){
			$rootScope.countries = data.geonames;
		})
		.error(function(){
			$location.path('/error')
		})
		//get url to update to country selected
		$scope.go = function(url) {
			$location.path('countries/' + url);
		}
}])
viewsModule.controller('capitalCtrlTest', ['$scope', function($scope){

}])