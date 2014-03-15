'use strict';

app.controller('NavCtrl', function ($scope, Auth) {
	
	$scope.logout = function () {
		Auth.logout();
	};
	
});
