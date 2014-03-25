'use strict';

app.controller('ActiveRaceCtrl', function ($location, $scope, $rootScope, $window, Race, User, ActiveRace, Participant) {

	if ($location.path() === '/') {
		$scope.races = Race.all;
		if (!$rootScope.activeRace) {
			$rootScope.activeRace = ActiveRace.getRace();
		}
	}

	$scope.currentUser = function () {
		User.getCurrent();
	};

	$scope.setActiveRace = function (raceId, race) {
//		$window.alert('Selected race: ' + race.name + ', raceId: '+ raceId);
		ActiveRace.setActiveRace(raceId, race);
		$location.path('/#');
	};

	$scope.tabs = [
		{ title: 'Available Races', content: 'Set active race from the list below'},
		{ title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
	];

	$scope.alertMe = function () {
		setTimeout(function () {
			$window.alert('You\'ve selected the alert tab!');
		});
	};

	$scope.getParticipantNames = function () {
		var participants = Participant.all;
		var participantNames = [];

		angular.forEach(participants, function (value) {
			if (value.name) {
				participantNames.push(value.name);
			}
		});
		return participantNames;
	};
	
});
