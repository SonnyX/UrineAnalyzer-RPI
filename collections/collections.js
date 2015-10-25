
Options = new Mongo.Collection("options");
Outputs = new Mongo.Collection("outputs");
SensorCollections = {
	ph:new Mongo.Collection("ph"),
	na:new Mongo.Collection("na"),
	k:new Mongo.Collection("k"),
	cl:new Mongo.Collection("cl")
}

/*for (var property in SensorCollections) {
	if (SensorCollections.hasOwnProperty(property)) {
		//add in the empty object the last element of each collection
		SensorCollections[property].before.insert(function(userId,doc){
			doc.createdAt = Date.now();
		})
	}
};*/

//just for test.
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
