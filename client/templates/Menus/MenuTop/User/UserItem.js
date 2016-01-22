Template.UserItem.helpers({
  username:function(){
    let user = Meteor.user()
    if(user){
      return user.username || user.emails[0].address.substring(0,user.emails[0].address.indexOf('@'));
    }
    return 'Machine';
  },
  locker(){
    let license = Settings.findOne({_id:'Services'});
    if(license.released){
      return {released:license.released,locker:'unlock'};
    }
    return {released:license.released,locker:'lock'};
  },
  isRoot(){
    return Session.get('_root');
  }
});

Template.UserItem.events({
  "click #locker": function(event, template){
    let self = this;
    Meteor.call('verifyConnection',function(error,isRoot){
      if(error) throw error;
      if(isRoot){
        Meteor.call('toggleServicesRelease',self.released)
      }
    })
  }
});
