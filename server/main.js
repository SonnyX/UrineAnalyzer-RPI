import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	HANDLE = undefined;
	Meteor.call('createAdmin'); //Located in lib/methods.js
	Meteor.call('getTemperatures') //Located in lib/methods.js
	Services.initialize(function(){}) //Located in server/services/
});
