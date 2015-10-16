Template.Main.onCreated(function () {
  let self = this;
  this.autorun(function(){
    self.subscribe("options");
    self.subscribe("ph",1);
    self.subscribe("na",1);
    self.subscribe("k",1);
    self.subscribe("cl",1);
  });
});
