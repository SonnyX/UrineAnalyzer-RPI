
Template.Message.onRendered(function(){
  let self = this.data;
  if(self.options.fade){
    Meteor.setTimeout(function(){
      Messages.remove({_id:self._id});
    }, self.options.fade)
  }
})
