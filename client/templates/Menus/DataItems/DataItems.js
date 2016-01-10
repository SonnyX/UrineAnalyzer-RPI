Template.DataItems.helpers({
  data: function(){
    return Settings.findOne({_id:'Data'});
  }
});
