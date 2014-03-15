'use strict';

app.controller('RacesCtrl', function ($scope, $location, Race) {
	if ($location.path() === '/races') {
		$scope.races = Race.all;
	}
	
	$scope.submitRace = function () {
		Race.create($scope.race).then(function () {
			$scope.race = {name: '', date: '', location: ''};
		});
	};

	$scope.updateRace = function (raceId, race) {
		Race.update(raceId, race);
	};

	$scope.deleteRace = function (raceId) {
		Race.delete(raceId);
	};
	
});
