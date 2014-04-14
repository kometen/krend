'use strict';

app.factory('ActiveRace', function ($firebase, FIREBASE_URL, User, $rootScope, Race) {
	var ref = new Firebase(FIREBASE_URL + 'active_race');
	var ar = $firebase(ref);
	var ActiveRace = {
		getActiveRace: ar,
		setActiveRace: function (raceId, race) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				race.owner = user.username;
				race.participants = null;
				ar.$child('raceId').$set(raceId);
				ar.$child('race').$set(race);

				$rootScope.activeRace = race;
				$rootScope.participantsInRace = Race.getParticipantsInRace(raceId);
			}
		},
		getRace: function () {
			ref.child('race').on('value', function (snapshot) {
				console.log('name: ' + snapshot.val().name);
				return snapshot.val().name + 'Claus';
			});
		},
		getRaceId: function () {
			ref.child('raceId').once('value', function (activeSnap) {
				console.log('getRaceId: ' + activeSnap.val());
				return activeSnap.val();
			});
		},
		updateParticipant: function (participantId, participant, raceId) {
			if (User.signedIn()) {
				ar.$child(raceId).$child('participants').$child(participantId).$update(participant);
			}
		}
	};

	return ActiveRace;
});
