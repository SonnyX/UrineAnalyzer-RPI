Template.Reset.events({
  "click #back": function(event, template){
    event.preventDefault()
    Session.set("reset-pswd", false);
  },
  'submit #reset-form':function(event,template){
    event.preventDefault();
    let newPassword = $('#reset-password').val();
    Accounts.resetPassword(template.data.token(), newPassword, function(error){
      if(error){
        Messages.newErrorMsg(error);
      }else{
        FlowRouter.go('Main');
        Messages.insert(
          {
            msg:'Password changed successfully',
            options:{
              closeBtn:true,
              type:'success',
              fade:4000
            }
          }
        )
      }
    })
  },
  'submit #request-form':function(event,template){
    event.preventDefault();
    let email = $('#request-email').val().trim();
    if(!email) return false;
    Accounts.forgotPassword({email},function(error){
      if(error){
        Messages.newErrorMsg(error);
      }else{
        Messages.insert(
          {
            msg:'E-mail sent to ' + email,
            options:{
              closeBtn:true,
              type:'info',
              fade:4000
            }
          }
        )
      }
    })
  }
});
