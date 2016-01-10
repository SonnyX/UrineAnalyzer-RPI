Template.Login.events({
  'submit #login-form': function(event,template){
    event.preventDefault();
    Meteor.loginWithPassword($('#login-name').val(), $('#login-pswd').val(),function(error){
      if(error){
        Messages.newErrorMsg(error);
      }else{
        FlowRouter.go('Main');
      }
    });
    return false;
  }
});
