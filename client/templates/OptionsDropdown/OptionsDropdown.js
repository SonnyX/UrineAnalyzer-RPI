Template.OptionsDropdown.events({
  "click .item": function(event, template){
    Meteor.call('settingsDropdownUpdate',template.data.option._id,this.valueOf())
  }
});

Template.OptionsDropdown.onRendered(function(){
  this.$('.dropdown').dropdown({
    action:'hide'
  });
});

Template.SettingsDropdown.events({
  "click .item": function(event, template){
    Meteor.call('settingsDropdownUpdate',template.data.setting._id,this.valueOf())
  }
});

Template.SettingsDropdown.onRendered(function(){
  this.$('.dropdown').dropdown({
    action:'hide'
  });
});
