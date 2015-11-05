Template.OptionsDropdown.events({
  "click .item": function(event, template){
    Options.update({_id:template.data.option._id}, {$set:{item:this.valueOf()}});
  }
});

Template.OptionsDropdown.onRendered(function(){
  this.$('.dropdown').dropdown({
    action:'hide'
  });
});

//Meteor.connection._mongo_livedata_collections
