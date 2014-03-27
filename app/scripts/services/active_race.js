'use strict';

app.factory('ActiveRace', function ($firebase, FIREBASE_URL, User, $rootScope, $window) {
	var ref = new Firebase(FIREBASE_URL + 'active_race');
	var ar = $firebase(ref);
	var ActiveRace = {
		setActiveRace: function (raceId, race) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				race.owner = user.username;
				ar.$child('raceId').$set(raceId);
				ar.$child('race').$set(race);
				$rootScope.activeRace = race;
				$rootScope.activeRaceId = raceId;
			}
		},
		addParticipant: function  () {
			console.log('adding participant');
		},
		getRace: function () {
			ref.child('race').on('value', function (snapshot) {
				console.log('name: ' + snapshot.val().name);
				return snapshot.val().name + 'Claus';
			});
		},
		getRaceId: function () {
			$window.alert('race: ' + ar.$child('race'));
			return ar.$child('raceId');
		}
	};

	$rootScope.$on('$firebaseSimpleLogin:logout', function () {
		ar.$child('raceId').$remove();
		ar.$child('race').$remove();
		delete $rootScope.activeRace;
	});
	
	return ActiveRace;
});
