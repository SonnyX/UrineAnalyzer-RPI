//Re-render the Main Layout with the options collections subscribed.
//Set a Session variable.
Template.Main.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe("options");
    self.subscribe('settings')
    self.subscribe('analysis');
    self.subscribe('samples');
  });
});

Template.Main.helpers({
  thereIsNothing: function(){
    return !Settings.find({}).count();
  }
});

Template.Main.onRendered(function(){
  let self = this;
  this.autorun(function(){
     if(self.subscriptionsReady()){
       verifyPhBuffer();
       if(Settings.findOne({_id:'Services'}).isBusy){
         Meteor.setTimeout(function(){
           Meteor.call('updateServices',function(error){
             if(error){
               Messages.newErrorMsg(error);
               return
             }
           });
         },100)
       }
     }
  });
})
