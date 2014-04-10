'use strict';

app.controller('ActiveRaceCtrl', function ($location, $scope, $rootScope, $window, Race, ActiveRace, Participant, FIREBASE_URL) {

	$scope.participant = {name: ''};

	if ($location.path() === '/') {
		$scope.races = Race.all;
		$rootScope.activeRace = ActiveRace.getActiveRace;
		var fb = new Firebase(FIREBASE_URL);
		fb.child('active_race/raceId').once('value', function (activeSnap) {
			$rootScope.participantsInRace = Race.getParticipantsInRace(activeSnap.val());
		});
	}

	$scope.setActiveRace = function (raceId, race) {
//		$window.alert('Selected race: ' + race.name + ', raceId: '+ raceId);
		ActiveRace.setActiveRace(raceId, race);
		$location.path('/#');
	};

	$scope.addParticipantToRace = function () {
		console.log('name: ' + $scope.participant.name.name + ', born: ' + $scope.participant.name.born + ', id: ' + $scope.participant.name.id + ', activeRaceId: ' + $rootScope.activeRace.raceId);
		Race.addParticipant($rootScope.activeRaceId, $scope.participant.name);
		$scope.participant = {name: ''};
	};

	$scope.updateParticipant = function (participantId, participant, raceId) {
		Race.updateParticipant(participantId, participant, raceId);
	};

	$scope.deleteParticipant = function (participantId, raceId) {
		Race.deleteParticipant(participantId, raceId);
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
