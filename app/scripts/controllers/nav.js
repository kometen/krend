'use strict';

app.controller('NavCtrl', function ($scope, $location, Participant, Auth) {
	
	$scope.participant = {name: '', year: '', club: ''};
	
	$scope.submitParticipant = function () {
		Participant.create($scope.participant).then(function (participantId) {
			$location.path('/participants/' + participantId);
			$scope.participant = {name: '', born: '', club: ''};
		});
	};

	$scope.logout = function () {
		Auth.logout();
	};
	
});
