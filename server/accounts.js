
Accounts.onCreateUser(function(options,user){
  if(/^[-._]|[^\w-.\s]|[-._]$/.exec(user.username)){
    throw new Meteor.Error(402, "Invalid character on username");
  }
  if(options.connection && options.connection.clientAddress){
    if(Meteor.userId() || options.connection.clientAddress =='127.0.0.1'){
      user._createdBy = Meteor.userId()|| '/';
      user.profile = options.profile || {};
      Options.find(
        {_id:{$regex:new RegExp('-' + Meteor.userId() + '$'),$options:'m'}}
      ).map(function(option,i){
        option._id =/^[^\-]*/.exec(option._id)+'-'+ user._id;
        Options.insert(option);
      })
      let creator = Meteor.users.findOne({_id:user._createdBy})
      if(creator){
        user.profile.creator = creator.username || creator.emails[0].address;
      }else{
        user.profile.creator =  user._createdBy;
      }
      return user;
    }
    throw new Meteor.Error(403, "Must be logged to register new user");
  }
  throw new Meteor.Error(402, "This is not a Secure connection","try using the Method VerifiedCreateUser");
})

Accounts.validateLoginAttempt(function(info){
  if(!info.allowed)
    throw info.error
  return true;
});

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: true,
  loginExpirationInDays: null,
});

Accounts.emailTemplates.siteName = 'Urine Analyzer';
Accounts.emailTemplates.from = 'teste@admin.com';
Accounts.emailTemplates.verifyEmail = {
  subject:function(user){
    if(user.username){
      return 'Verification of ' + user.username + ' account';
    }else{
      return 'Verification of your Account with no Name!';
    }
  },
  text: function(user,url){
    return 'To conclude the verification of your e-mail please procede to this link below\n'
    + url;
  }
}

Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('entry/reset-password/' + token);
  };
