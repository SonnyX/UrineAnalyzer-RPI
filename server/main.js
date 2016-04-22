import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	HANDLE = undefined;
	Meteor.call('createAdmin'); //Located in lib/methods.js
	Meteor.call('getTemperatures') //Located in lib/methods.js
	var Future = Npm.require('fibers/future');
	var fut = new Future();
  var bound_callback = Meteor.bindEnvironment(function (err, res) {
    if (err) fut.throw(err);
    else fut.return(res);
  });
	Services.initialize( bound_callback ) //Located in server/services/
	fut.wait();
	Meteor.call('restartSampling');
});
