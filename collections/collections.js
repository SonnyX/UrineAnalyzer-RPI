
Options = new Mongo.Collection("options");
Outputs = new Mongo.Collection("outputs");
/*SensorPh = new Mongo.Collection("ph");
SensorNa = new Mongo.Collection("na");
SensorK = new Mongo.Collection("k");
SensorCl = new Mongo.Collection("cl");*/
SensorCollections = {
	ph:new Mongo.Collection("ph"),
	na:new Mongo.Collection("na"),
	k:new Mongo.Collection("k"),
	cl:new Mongo.Collection("cl")
}
Options.allow({
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
