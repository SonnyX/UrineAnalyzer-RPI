
Meteor.publish("options", function (argument) {
	return Options.find({});
});
Meteor.publish("outputs", function (argument) {
	return Outputs.find({});
});
Meteor.publish("sensors", function({date}){
	if(!date){
		date = moment(SensorCollections.lastInsertion()).startOf('day').toDate()
	}
	//problems with the utc offset must be fixed!!!
	date = moment(date.toISOString()).add(moment(date.toISOString()).utcOffset(),'minutes').toDate()
	return SensorCollections.samplesFromDate(date);
});
Meteor.publish("messages", function(argument){
	return Messages.find({})
});
