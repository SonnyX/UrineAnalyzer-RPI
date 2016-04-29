import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.call('createAdmin'); //Located in lib/methods.js
	Meteor.call('getTemperatures') //Located in lib/methods.js
  var bound_callback = Meteor.bindEnvironment(function (err, res) {
    if (Settings.findOne({ _id: 'SamplingState' }).value) {
      Meteor.call('restartSampling');
      console.log("Automatically restarted sampling");
    }
  });
	Services.initialize( bound_callback ) //Located in server/services/
});
