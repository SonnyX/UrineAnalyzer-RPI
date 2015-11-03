
Meteor.publish("options", function (argument) {
	return Options.find({});
});
Meteor.publish("outputs", function (argument) {
	return Outputs.find({});
});
Meteor.publish("sensors", function({date}){
	if(!date){
		date = moment(SensorCollections.lastInsertion())
		date = date.startOf('day').add(date.utcOffset(),'minutes').toDate();
	}
	return SensorCollections.samplesFromDate(date);
});
