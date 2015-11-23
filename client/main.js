verifyPhBuffer = function verifyPhBuffer(){
  const currentDay = moment().startOf('day')
  const nextRepDay =  moment(Options.findOne({_id:'PhBuffer'}).date).add(21,'days')
  const difference = (currentDay.diff(nextRepDay,'days'))
  if(difference>-1){
    Meteor.call('messages.show','PhBufferMsg');
  }else{
    Meteor.call('messages.clear','PhBufferMsg');
    Meteor.setTimeout(function () {
      verifyPhBuffer();
    }, (difference*(-1))*8.64e+7/*1 day*/);
  }
}

ordinal = function ordinal(n) {
  let s=["th","st","nd","rd"],v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}
