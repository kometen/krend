'use strict';

app.factory('ParticipantsInRace', function ($firebase, FIREBASE_URL, $rootScope) {
/*	var raceId = '';
	new Firebase(FIREBASE_URL + 'active_race/raceId').once('value', function (snap) {
		raceId = snap.val();
		console.log('raceId inside once-call: ' + raceId);
		var ref = new Firebase(FIREBASE_URL + 'races/' + raceId + '/participants');
		var participantsInRace = $firebase(ref);
		console.log('ParticipantsInRace-path: ' + ref.toString());
		var ParticipantsInRace = {
			all: participantsInRace
		};
	
		return ParticipantsInRace;
	//	return raceId;
	});*/
	console.log('raceId outside once-call: ' + $rootScope.raceId);
	var ref = new Firebase(FIREBASE_URL + 'races/' + $rootScope.raceId + '/participants');
	var participantsInRace = $firebase(ref);
	console.log('ParticipantsInRace-path: ' + ref.toString());
	var ParticipantsInRace = {
		all: participantsInRace
	};
	
	return ParticipantsInRace;
});
