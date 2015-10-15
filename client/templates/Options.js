Template.DataOptions.onCreated(function () {
  var self = this;
  this.data.id = FlowRouter.getParam('id');
  self.autorun(function(){
     self.subscribe("options");
  });
});

Template.DataOptions.helpers({
  active(){
    if(Template.instance().subscriptionsReady())
      return Options.findOne({'option':'SamplesAmount','sensor':this.id},{reactive:false});
  },items(){
    if(Template.instance().subscriptionsReady())
      return Options.findOne({'option':'SamplesOptions'}).items;
  }
});

Template.DataOptions.events({
  "click .item": function(event, template){
  }
});

/*Template.DataOptions.onRendered(function(){
  var self = this;
  this.autorun(function(){
     if(self.subscriptionsReady()){
       self.$('.ui.inline.dropdown').dropdown();
     }
  });
});*/

Template.DataOptions.rendered = function(){
  var self = this
  console.log(this);
  Tracker.autorun(function(){
    if(self.subscriptionsReady()){
      console.log($('.ui.inline.dropdown').dropdown());
    }
  });
};
