'use strict';

app.controller('ParticipantsCtrl', function ($scope, $location, Participant, Club) {
	if ($location.path() === '/participants') {
		$scope.participants = Participant.all;
	}
	
	$scope.submitParticipant = function () {
		Participant.create($scope.participant).then(function () {
			$scope.participant = {name: '', born: '', club: ''};
		});
	};

	$scope.updateParticipant = function (participantId, participant) {
		Participant.update(participantId, participant);
	};

	$scope.deleteParticipant = function (participantId) {
		Participant.delete(participantId);
	};

	$scope.getClubNames = function () {
		var clubs = Club.all;
		var clubNames = [];

		angular.forEach(clubs, function (value) {
			if (value.name) {
				clubNames.push(value.name);
			}
		});
		return clubNames;
	};
	
});
