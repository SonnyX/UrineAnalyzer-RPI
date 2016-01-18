verifyPhBuffer = function verifyPhBuffer(){
  const currentDay = moment().startOf('day')
  const nextRepDay =  moment(Settings.findOne({_id:'PhBuffer'}).date).add(21,'days')
  const difference = (currentDay.diff(nextRepDay,'days'));
  if(difference>-1){
    Messages.insert(
      {
        msg:'Time to change the pH buffer',
        options:{
          closeBtn:false,
          type:'warning'
        },
        extraBtn:{
          callback:{
            name:'updatePhBufferDate'
          },
          text:'Done'
        },
        _id:'PhBufferMsg'
      },
      function(error){if(error)return}
    )
  }else{
    Messages.remove({_id:'PhBufferMsg'});
    //Meteor.call('messages.clear','PhBufferMsg');
    Meteor.setTimeout(function () {
      verifyPhBuffer();
    }, (difference*(-1))*8.64e+7/*1 day*/);
  }
}

ordinal = function ordinal(n) {
  let s=["th","st","nd","rd"],v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

Accounts.onEmailVerificationLink(function(token,done){
  Messages.insert(new Message({msg:'e-mail verified',options:{closeBtn:true,type:'success',fade:5000}}))
  Accounts.verifyEmail(token,function(error){
    if(error) throw error
    done();
  })
})

Template.registerHelper("buttonLicense", function (param) {
  let license = Settings.findOne({_id:'Services'}).released;
  if(!license){
    return 'disabled';
  }else{
    return '';
  }
});
