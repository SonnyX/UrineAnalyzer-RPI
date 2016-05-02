
Template.CalibrationButton.helpers({
  options(){
    let samplingState = Settings.findOne({_id:'SamplingState'});
    if(samplingState.value)
      return {button:'negative',icon:'stop',color:'grey',text:'Stop'};
    return {button:'positive',icon:'play',color:'green',text:'Start'};
  }
});

Template.CalibrationButton.events({
  "click .button": function(event, template){
    let button = template.$(event.currentTarget);
    if(button.hasClass('positive')){
      Meteor.call('startSampling',function(error,result){
        if(error){
          Messages.newErrorMsg(error);
          return false;
        }
        //True(button)
        //Session.set("timeId",randomDataGenerator());
      })
    }
    else {
      Meteor.call('stopSampling',function(error,result){
        if(error){
          Messages.newErrorMsg(error);
          return false;
        }
        //False(button)
        //Meteor.clearInterval(Session.get("timeId"))
      })
    }
  }
});

function True(target){
  target.removeClass('positive');
  target.addClass('negative');
  target.children().removeClass('play');
  target.children().addClass('stop');
  //Meteor.call('toggleSampling',true);
}

function False(target){
  target.removeClass('negative');
  target.addClass('positive')
  target.children().removeClass('stop');
  target.children().addClass('play');
  //Meteor.call('toggleSampling',false);
}
