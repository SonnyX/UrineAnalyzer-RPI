//Re-render the Main Layout with the options collections subscribed.
//Set a Session variable.
Template.Main.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe("options");
  });
});

Meteor.setInterval(function () {
  Session.set("currentTime",new Date());
}, 3000);

Template.Main.onRendered(function(){
  let self = this;
  this.autorun(function(){
     if(self.subscriptionsReady()){
       verifyPhBuffer();
     }
  });
})
