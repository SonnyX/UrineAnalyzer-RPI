Template.Register.events({
  'submit form': function(event,template){
    event.preventDefault();
    let user = {
      username:$('#register-username').val(),
      email:$('#register-email').val().trim(),
      password:$('#register-pswd').val()
    };
    Meteor.call('VerifiedCreateUser',user,function(error,id){
      if(error){
        Messages.newErrorMsg(error);
      }else{
        Meteor.loginWithPassword({id},user.password,function(error){
          if(error){
            Messages.newErrorMsg(error);
          }else{
            FlowRouter.go('Main');
          }
        });
      }
    });
  }
});
