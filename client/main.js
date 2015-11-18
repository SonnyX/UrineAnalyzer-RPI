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
