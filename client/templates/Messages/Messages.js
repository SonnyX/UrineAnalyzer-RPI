Template.Messages.onCreated(function(){
	let self = this;
	this.autorun(function(){
		self.subscribe('messages');
	});
});

Template.Messages.helpers({
	messages(){
		return Messages.find({active:true},{sort:{createdAt:-1}})
	}
});

Template.Messages.events({
	"click .closeBtn": function(event, template){
		Meteor.call('messages.clear',this._id)
	},
	'click .extraBtn':function(event,template){
		Meteor.call(this.callback.name,this.callback.args, function(error, result){
			if(error){
				console.log("error: ", error);
			}
			if(result){
				 Meteor.call('messages.clear',result)
			}
		});
	}
});
