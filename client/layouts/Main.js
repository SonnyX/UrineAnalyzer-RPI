//Re-render the Main Layout with the options collections subscribed.
//Set a Session variable.
Template.Main.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe("options");
  });
});
