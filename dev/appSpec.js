describe('Testing Routes', function () {
	beforeEach(module('app'));

	it('should test routes',
	inject(function ($route) {

	  expect($route.routes['/'].controller).toBe('mainCtrl');
	  expect($route.routes['/'].templateUrl).toEqual('../dev/pages/home.html');

	  expect($route.routes['/countries'].controller).toBe('countryCtrl');
	  expect($route.routes['/countries'].templateUrl).toEqual('../dev/pages/countries.html');

	  expect($route.routes['/countries/:country'].controller).toBe('capitalCtrl');
	  expect($route.routes['/countries/:country'].templateUrl).toEqual('../dev/pages/capital.html');

	  expect($route.routes[null].redirectTo).toEqual('/error');
}));

});