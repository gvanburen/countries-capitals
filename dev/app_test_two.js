var appLib = angular.module('appLibrary',[])
.constant('cc_api_prefix', 'http://api.geonames.org/searchJSON?')
.constant('cc_country_path', 'q={{ q }}&name_equals={{ q }}&orderby=relavance&username=gvanburen')
.constant('appRequest', ['$http', '$q', 'cc_api_prefix', 
	function($http, $q, cc_api_prefix){
		return function(path) {
			var defer = $q.defer();
			$http.get(cc_api_prefix + path)
			.success(function(data){
				defer.resolve(data);
			})
			return defer.promise;
		}
	}])


.factory('findCountry', ['appRequest', '$interpolate', 'cc_country_path'
	function(appRequest, $interpolate, cc_country_path){
		return function(q){
			var path;
			if(q.match(/^\d+$/)){
				path = $interpolate('cc_country_path')({
					q: q
				});
			} else {
				path = $interpolate('cc_country_path')({
					q: q
				});
			}
			return 
		}
	}])