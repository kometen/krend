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
		},
		// participants in race
		updateActiveRaceParticipant: function (participantId, participant, raceId) {
			if (User.signedIn()) {
				var user = User.getCurrent();

				if (User.signedIn()) {
					races.$child(user.username).$child(raceId).$child('participants').$child(participantId).$update(participant);
				}
			}
		},
		addParticipantToRace: function  (raceId, participant) {
			if (User.signedIn()) {
				ref.child(raceId).child('participants').child(participant.id).setWithPriority(participant, new Date().getTime());
			}
		},
		getParticipantsInRace: function () {
			if (User.signedIn()) {
				var t = [];
				var user = User.getCurrent();
				var fb = new Firebase(FIREBASE_URL + 'users');
				fb.child(user.username).child('activeRace/raceId').once('value', function (userSnap) {
					console.log('pRef: ' + FIREBASE_URL + 'races/' + userSnap.val() + '/participants');
					console.log('activeRaceId: ' + userSnap.val());
					t = races.$child(userSnap.val()).$child('participants');
				});
				return t;
			}
		},
		updateParticipant: function (participantId, participant, raceId) {
			console.log('update participant named ' + participant.name + ', raceId: ' + raceId);
		},
		updateParticipantWithStartNumberAndTime: function(raceId, participantId, startnumber, time) {
			console.log('update startnumber and time, raceId: ' + raceId + ', participantId: ' + participantId + ', startnumber: ' + startnumber + ', racestart: ' + time);
			races.$child(raceId).$child('participants').$child(participantId).$update({ startnumber : startnumber, starttime : ((startnumber - 1) * 15000 + time) });
		},
		deleteParticipantInRace: function (participantId, raceId) {
			console.log('delete participant: ' + participantId + ', raceId: ' + raceId);
			races.$child(raceId).$child('participants').$remove(participantId);
		}

	};

	return Race;
});
