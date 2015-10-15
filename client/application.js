Meteor.startup(function(){
  Meteor.subscribe("options");
  Meteor.subscribe("outputs");
  //Meteor.subscribe("ph");
  //Meteor.subscribe("na");
  //Meteor.subscribe("k");
  //Meteor.subscribe("cl");

  //Ops = Options.find({'option':'SamplesAmount','sensor':'ph'},{reactive: false})
});
