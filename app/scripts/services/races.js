'use strict';

app.factory('Race', function ($firebase, FIREBASE_URL, User) {
	var ref = new Firebase(FIREBASE_URL + 'races');
	var races = $firebase(ref);
	var Race = {
		all: races,
		create: function (race) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				race.owner = user.username;
				return races.$add(race).then(function (ref) {
					var raceId = ref.name();
					
					user.$child('races').$child(raceId).$set(raceId);
					
					return raceId;
				});
			}
		},
		find: function (raceId) {
			return races.$child(raceId);
		},
		update: function (raceId, race) {
			if (User.signedIn()) {
				races.$child(raceId).$update(race);
			}
		},
		delete: function (raceId) {
			if (User.signedIn()) {
				var race = Race.find(raceId);
				
				race.$on('loaded', function () {
					var user = User.findByUsername(race.owner);
					
					races.$remove(raceId).then(function () {
						user.$child('races').$remove(raceId);
					});
				});
			}
		}
	};
	
	return Race;
});
