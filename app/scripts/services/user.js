'use strict';

app.factory('User', function ($firebase, $rootScope, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL + 'users');
	
	var users = $firebase(ref);
	
	var User = {
		create: function (authUser, username) {
			users[username] = {
				md5Hash: authUser.md5Hash,
				username: username,
				$priority: authUser.uid
			};
			
			users.$save(username).then(function () {
				setCurrentUser(username);
			});
		},
		findByUsername: function (username) {
			if (username) {
				return users.$child(username);
			}
		},
		getCurrent: function () {
			return $rootScope.currentUser;
		},
		signedIn: function () {
			return $rootScope.currentUser !== undefined;
		},
		// active race
		setActiveRace: function (raceId, race) {
			if (User.signedIn()) {
				console.log('setActiveRace: ' + raceId);
				var user = User.getCurrent();
				
				race.owner = user.username;
				race.participants = null;
				users.$child(user.username).$child('activeRace').$child('raceId').$set(raceId);
				users.$child(user.username).$child('activeRace').$child('race').$set(race);
			}
		},
		getActiveRace: function () {
			if (User.signedIn()) {
				var user = User.getCurrent();
				console.log('user: ' + user.username);

				return users.$child(user.username).$child('activeRace');
			}
		},
		getActiveRaceId: function () {
			if (User.signedIn()) {
				var user = User.getCurrent();

				return users.$child(user.username).$child('activeRace').$child('raceId');
			}
		},
	};
	
	function setCurrentUser (username) {
		$rootScope.currentUser = User.findByUsername(username);
	}
	
	$rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
		
		query.$on('loaded', function () {
			setCurrentUser(query.$getIndex()[0]);
		});
	});
	
	$rootScope.$on('$firebaseSimpleLogin:logout', function () {
		delete $rootScope.currentUser;
	});
	
	return User;
});
