//Re-render the Main Layout with the options collections subscribed.
//Set a Session variable.
Template.Main.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe("options");
    if(self.subscriptionsReady()){
      Session.set("SamplesOptions", Options.findOne({'option':'SamplesOptions'}).data.items);
    }
  });
});
