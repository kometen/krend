'use strict';

app.controller('ActiveRaceCtrl', function ($location, $scope, $rootScope, $window, Race, User, ActiveRace, Participant) {

	$scope.participant = {name: ''};

	if ($location.path() === '/') {
		$scope.races = Race.all;
		$rootScope.activeRace = ActiveRace.getActiveRace;
		ActiveRace.getRaceId();
	}

//	$scope.participantsInRace = [{name: 'Claus', born: '1967'}, {name: 'Eline', born: '2000'}];
	Race.getParticipantsInRace();

	$scope.currentUser = function () {
		User.getCurrent();
	};

	$scope.setActiveRace = function (raceId, race) {
//		$window.alert('Selected race: ' + race.name + ', raceId: '+ raceId);
		ActiveRace.setActiveRace(raceId, race);
		$location.path('/#');
	};

	$scope.addParticipantToRace = function () {
		console.log('name: ' + $scope.participant.name.name + ', born: ' + $scope.participant.name.born + ', id: ' + $scope.participant.name.id);
		Race.addParticipant($scope.activeRaceId, $scope.participant.name);
		$scope.participant = {name: ''};
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

		angular.forEach(participants, function (value, key) {
			if (value.name) {
				value.id = key;
				participantNames.push(value);
			}
		});
		return participantNames;
	};

});
