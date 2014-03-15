'use strict';

app.controller('ClubsCtrl', function ($scope, $location, Club) {
	if ($location.path() === '/clubs') {
		$scope.clubs = Club.all;
	}
	
	$scope.submitClub = function () {
		Club.create($scope.club).then(function () {
			$scope.club = {name: '', city: ''};
		});
	};

	$scope.updateClub = function (clubId, club) {
		Club.update(clubId, club);
	};

	$scope.deleteClub = function (clubId) {
		Club.delete(clubId);
	};
	
});
