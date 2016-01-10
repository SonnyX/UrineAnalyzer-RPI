Template.Messages.helpers({
	messages(){
		//return Messages.find({active:true},{sort:{createdAt:-1}})
		return Messages.find({},{sort:{createdAt:-1}})
	}
});

Template.Messages.events({
	"click .closeBtn": function(event, template){
		//Meteor.call('messages.clear',this._id)
		Messages.remove({_id:this._id})
	},
	'click .extraBtn':function(event,template){
		let self = this;
		Meteor.call(this.extraBtn.callback.name,this.extraBtn.callback.args, function(error, result){
			if(error){
				console.log(error.error);
				console.log(error.reason);
				return false;
			}
			if(result){
				 //Meteor.call('messages.clear',result)
				 Messages.remove({_id:self._id})
			}
		});
	}
});
