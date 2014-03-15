'use strict';

app.factory('Club', function ($firebase, FIREBASE_URL, User) {
	var ref = new Firebase(FIREBASE_URL + 'clubs');
	var clubs = $firebase(ref);
	var Club = {
		all: clubs,
		create: function (club) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				club.owner = user.username;
				return clubs.$add(club).then(function (ref) {
					var clubId = ref.name();
					
					user.$child('clubs').$child(clubId).$set(clubId);
					
					return clubId;
				});
			}
		},
		find: function (clubId) {
			return clubs.$child(clubId);
		},
		update: function (clubId, club) {
			if (User.signedIn()) {
				clubs.$child(clubId).$update(club);
			}
		},
		delete: function (clubId) {
			if (User.signedIn()) {
				var club = Club.find(clubId);
				
				club.$on('loaded', function () {
					var user = User.findByUsername(club.owner);
					
					clubs.$remove(clubId).then(function () {
						user.$child('clubs').$remove(clubId);
					});
				});
			}
		}
	};
	
	return Club;
});
