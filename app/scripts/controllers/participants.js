'use strict';

app.controller('ParticipantsCtrl', function ($scope, $location, Participant) {
	if ($location.path() === '/') {
		$scope.participants = Participant.all;
	}
	
	$scope.participant = {name: ''};
	
	$scope.submitParticipant = function () {
		Participant.create($scope.participant).then(function () {
			$scope.participant = {name: '', born: '', club: ''};
		});
	};
	
	$scope.deleteParticipant = function (participantId) {
		Participant.delete(participantId);
	};
	
});
