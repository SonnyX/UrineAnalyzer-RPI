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

Template.SettingsDropdown.events({
  "click .item": function(event, template){
    Settings.update({_id:template.data.setting._id}, {$set:{item:this.valueOf()}});
  }
});

Template.SettingsDropdown.onRendered(function(){
  this.$('.dropdown').dropdown({
    action:'hide'
  });
});
