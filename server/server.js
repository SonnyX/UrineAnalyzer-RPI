
Meteor.startup(function () {
	HANDLE = undefined;
	Meteor.call('createAdmin');
	Meteor.call('getTemperatures')
	Services.initialize(function(){})
})
