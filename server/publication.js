
Meteor.publish("options", function (argument) {
	return Options.find({_id:{$regex:new RegExp('-' + this.userId + '$'),$options:'m'}});
});
Meteor.publish("outputs", function (argument) {
	let self = this;
	_(Outputs.aggregate([
		{$group:{_id:'$group',outputs:{$push:'$$ROOT'}}}
	])).each(function(group){
		self.added('outputs',group._id,{outputs:group.outputs})
	})
	this.ready();
});
Meteor.publish("outputsOriginal", function(argument){
	return Outputs.find({});
});
Meteor.publish('analysis', function(argument){
  return Analysis.find({});
});
Meteor.publish('samples', function(argument){
  return Samples.find({});
});
Meteor.publish("settings", function(argument){
	return Settings.find({})
});
