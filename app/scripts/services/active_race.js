'use strict';

app.factory('ActiveRace', function ($firebase, FIREBASE_URL, User, $rootScope) {
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
				$rootScope.activeRaceId = raceId;
			}
		},
		getRace: function () {
			ref.child('race').on('value', function (snapshot) {
				console.log('name: ' + snapshot.val().name);
				return snapshot.val().name + 'Claus';
			});
		},
		getRaceId: function () {
/*			var fb = new Firebase(FIREBASE_URL);
			fb.child('active_race/raceId').once('value', function (activeSnap) {
				fb.child('races/' + activeSnap.val() + '/owner').once('value', function (ownerSnap) {
					console.log('activeSnap: ' + activeSnap.val() + ', ownerSnap: ' + ownerSnap.val());
				});
			});*/
			return ar.$child('raceId');
		}
	};

	return ActiveRace;
});
