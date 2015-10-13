Outputs = new Mongo.Collection("outputs");
SensorPh = new Mongo.Collection("ph");
SensorNa = new Mongo.Collection("na");
SensorK = new Mongo.Collection("k");
SensorCl = new Mongo.Collection("cl");
SensorCollections = {
	ph:SensorPh,
	na:SensorNa,
	k:SensorK,
	cl:SensorCl
}
if (Meteor.isServer) {
	Meteor.publish("outputs", function () {
	  return Outputs.find({});
	});
	Meteor.publish("ph", function(argument){
		return SensorPh.find({},{sort:{date:-1}});
	});
	Meteor.publish("na", function(argument){
		return SensorNa.find({},{sort:{date:-1}});
	});
	Meteor.publish("k", function(argument){
		return SensorK.find({},{sort:{date:-1}});
	});
	Meteor.publish("cl", function(argument){
		return SensorCl.find({},{sort:{date:-1}});
	});
}

if (Meteor.isClient) {
	Meteor.subscribe("outputs");
	Meteor.subscribe("ph");
	Meteor.subscribe("na");
	Meteor.subscribe("k");
	Meteor.subscribe("cl");
}


SensorPh.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
SensorNa.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
SensorK.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
SensorCl.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
