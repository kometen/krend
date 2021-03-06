'use strict';

app.controller('ActiveRaceCtrl', function ($location, $scope, $rootScope, $window, Race, User, Participant) {

	$scope.participant = {name: ''};

	if ($location.path() === '/') {
/*		if (angular.isUndefined($rootScope.raceLockedStatus)) {
			$rootScope.raceLockedStatus = false;
			$scope.raceLockedMsg = 'Lock Race';
		}*/
		$scope.races = Race.all;
		$scope.activeRace = User.getActiveRace();
		$scope.participantsInRace = Race.getParticipantsInRace();
	}

	$scope.setActiveRace = function (raceId, race) {
//		$window.alert('Selected race: ' + race.name + ', raceId: '+ raceId);
		User.setActiveRace(raceId, race);
		$rootScope.raceLockedStatus = race.locked;
		if (race.locked) {
			$rootScope.raceLockedMsg = 'Unlock Race';
		} else {
			$rootScope.raceLockedMsg = 'Lock Race';
		}
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
		if ($rootScope.raceLockedStatus === false || $rootScope.raceLockedStatus === undefined) {
			$rootScope.raceLockedStatus = true;
			$scope.activeRace.race.locked = true;
			Race.setRaceLockedStatus(raceId, $scope.activeRace.race);
			$scope.raceLockedMsg = 'Unlock Race';
			msg = 'locked';
			// stackoverflow.com/questions/22135196/how-do-i-loop-through-the-children-of-a-firebase-instance
			var keys = $scope.participantsInRace.$getIndex();
			var i = 1;
			$scope.startId = {};
			angular.forEach(keys, function(key)	{
				Race.updateParticipantWithStartNumberAndTime(raceId, key, i, $scope.activeRace.race.time, $scope.activeRace.race.interval);	// raceId, participantId, startnumber, time, interval
//				console.log('racestart: ' + $scope.activeRace.race.time);
				$scope.startId[i] = key;
				i++;
			});
		} else {
			$rootScope.raceLockedStatus = false;
			$scope.activeRace.race.locked = false;
			Race.setRaceLockedStatus(raceId, $scope.activeRace.race);
			$scope.raceLockedMsg = 'Lock Race';
			msg = 'unlocked';
		}
		console.log(msg + ' race with id ' + raceId);
	};

	$scope.registerParticipantsRaceTime = function(raceId) {
		var startnr = $scope.participant.startnumber;
		var start = $scope.activeRace.race.time + (($scope.participant.startnumber - 1) * $scope.activeRace.race.interval * 1000);
		var hour = parseInt($scope.participant.endtime.substr(0,2));
		var minute = parseInt($scope.participant.endtime.substr(2,2));
		var second = parseInt($scope.participant.endtime.substr(4,2));
		var end = ((hour - 1) * 3600 + minute * 60 + second) * 1000;
		var id = $scope.startId[$scope.participant.startnumber];
		Race.updateParticipantWithEndtime(raceId, id, end);	// raceId, participantId, startnumber, time
		console.log('startnr: ' + startnr + ', start: ' + start + ', end: ' + end + ', id: ' + id + ', raceId: ' + raceId);
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
