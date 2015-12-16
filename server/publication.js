
Meteor.publish("options", function (argument) {
	return Options.find({});
});
Meteor.publish("outputs", function (argument) {
	return Outputs.find({});
});
Meteor.publish("messages", function(argument){
	return Messages.find({})
});
Meteor.publish('analysis', function(argument){
  return SensorsDB.analysis.find({});
});
Meteor.publish('samples', function(argument){
  return SensorsDB.samplesPerHour.find({});
});
