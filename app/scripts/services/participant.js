'use strict';

app.factory('Participant', function ($firebase, FIREBASE_URL, User) {
	var ref = new Firebase(FIREBASE_URL + 'participants');
	var participants = $firebase(ref);
	var Participant = {
		all: participants,
		create: function (participant) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				participant.owner = user.username;
				return participants.$add(participant).then(function (ref) {
					var participantId = ref.name();
					
					user.$child('participants').$child(participantId).$set(participantId);
					
					return participantId;
				});
			}
		},
		find: function (participantId) {
			return participants.$child(participantId);
		},
		update: function (participantId, participant) {
			console.log('id: ' + participantId + ', participant.name: ' + participant.name);
			if (User.signedIn()) {
				participants.$child(participantId).$update(participant);
			}
		},
		delete: function (participantId) {
			if (User.signedIn()) {
				var participant = Participant.find(participantId);
				
				participant.$on('loaded', function () {
					var user = User.findByUsername(participant.owner);
					
					participants.$remove(participantId).then(function () {
						user.$child('participants').$remove(participantId);
					});
				});
			}
		},
		addComment: function (participantId, comment) {
			if (User.signedIn()) {
				var user = User.getCurrent();
				
				comment.username = user.username;
				comment.participantId = participantId;
				
				participants.$child(participantId).$child('comments').$add(comment).then(function (ref) {
					user.$child('comments').$child(ref.name()).$set({id: ref.name(), participantId: participantId});
				});
			}
		},
		deleteComment: function (participant, comment, commentId) {
			if (User.signedIn()) {
				var user = User.findByUsername(comment.username);
				
				participant.$child('comments').$remove(commentId).then(function () {
					user.$child('comments').$remove(commentId);
				});
			}
		},
	};
	
	return Participant;
});
