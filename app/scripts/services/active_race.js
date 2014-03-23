'use strict';

app.factory('ActiveRace', function ($firebase, FIREBASE_URL, User) {
	var ref = new Firebase(FIREBASE_URL + 'active_race');
	var ar = $firebase(ref);
	var ActiveRace = {
		setRace: function (raceId, race) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				race.owner = user.username;
				ar.$child('raceId').$set(raceId);
				ar.$child('race').$set(race);
			}
		},
		getRaceId: function () {
			return ar.$child('raceId');
		}
	};

	return ActiveRace;
});
