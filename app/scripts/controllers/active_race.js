'use strict';

app.controller('ActiveRaceCtrl', function ($location, $scope, $rootScope, $window, Race, User, Participant) {

	$scope.participant = {name: ''};

	if ($location.path() === '/') {
		if (angular.isUndefined($scope.lockRaceStatus)) {
			$scope.raceLocked = false;
			$scope.raceLockedMsg = 'Lock Race';
		}
		$scope.races = Race.all;
		$scope.activeRace = User.getActiveRace();
		$scope.participantsInRace = Race.getParticipantsInRace();
	}

	$scope.setActiveRace = function (raceId, race) {
//		$window.alert('Selected race: ' + race.name + ', raceId: '+ raceId);
		User.setActiveRace(raceId, race);
		$location.path('/#');
	};

	$scope.addParticipantToRace = function (activeRaceId) {
		console.log('name: ' + $scope.participant.name.name + ', born: ' + $scope.participant.name.born + ', id: ' + $scope.participant.name.id);
		Race.addParticipantToRace(activeRaceId, $scope.participant.name);
		$scope.participant = {name: ''};
	};

	$scope.updateParticipant = function (participantId, participant, raceId) {
		User.updateParticipant(participantId, participant, raceId);
	};

	$scope.deleteParticipantInRace = function (participantId, raceId) {
		Race.deleteParticipantInRace(participantId, raceId);
	};

	$scope.toggleLockStatusRace = function (raceId) {
		var msg = '';
		if ($scope.raceLocked === false) {
			$scope.raceLocked = true;
			$scope.raceLockedMsg = 'Unlock Race';
			msg = 'locked';
		} else {
			$scope.raceLocked = false;
			$scope.raceLockedMsg = 'Lock Race';
			msg = 'unlocked';
		}
		console.log(msg + ' race with id ' + raceId);
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
