if (Meteor.isServer) {
	Meteor.publish("options", function (argument) {
	  return Options.find({});
	});
	Meteor.publish("outputs", function (argument) {
	  return Outputs.find({});
	});
	Meteor.publish("sensor", function({sensor,limit}){
		if(limit == "All")
			limit = undefined;
		return SensorCollections[sensor].find({},{sort:{date:-1},limit:limit});
	});
}
