Outputs = new Mongo.Collection("outputs");

if (Meteor.isServer) {
	Meteor.publish("outputs", function () {
	  return Outputs.find({});
	});
}

if (Meteor.isClient) {
	Meteor.subscribe("outputs");
}
