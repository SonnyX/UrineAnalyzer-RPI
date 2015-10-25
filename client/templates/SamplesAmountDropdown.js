Template.SamplesAmountDropdown.helpers({
  items(){
    return Session.get('SamplesOptions');
  }
});
Template.SamplesAmountDropdown.events({
  "click .item": function(event, template){
    var selector = {'option':template.data.option,'_id':template.data._id}
    var modifier = {'data.item':this.valueOf()}
    Meteor.call("updateOptions", selector,modifier);
  }
});

Template.SamplesAmountDropdown.onRendered(function(){
  this.$('.dropdown').dropdown();
});
