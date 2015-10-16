Template.Options.helpers({
  sensors(){
    return ['pH','Na','K','Cl']
  }
});

Template.SamplesAmount.helpers({
  active(){
    let data = Options.findOne({'option':'SamplesAmount','data.sensor':this.toLowerCase()},{reactive:false}).data
    return data
  },items(){
    return Options.findOne({'option':'SamplesOptions'}).data.items;
  }
});

Template.SamplesAmount.events({
  "click .item": function(event, template){
    self = this;
    var selector = {'option':'SamplesAmount','data.sensor':template.data.toLowerCase()}
    var modifier = {'data.item':this.valueOf()}
    Meteor.call("updateOptions", selector,modifier);
  }
});

Template.SamplesAmount.onRendered(function(){
  this.$('.ui.inline.dropdown').dropdown();
});
