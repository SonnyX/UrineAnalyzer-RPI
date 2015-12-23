
Template.SamplingButton.helpers({
  options(){
    let samplingFreq = Options.findOne({_id:'SamplingFreq'});
    if(samplingFreq.isActive)
      return {button:'negative',icon:'stop',color:'red',text:'Stop'};
    return {button:'positive',icon:'play',color:'green',text:'Start'};
  }
});

Template.SamplingButton.events({
  "click .button": function(event, template){
    let button = template.$(event.currentTarget);
    if(button.hasClass('positive')){
      True(button)
      Meteor.call("samplingSignal", true)
      Session.set("timeId",randomDataGenerator());
    }
    else {
      False(button)
      Meteor.call("samplingSignal", false);
      Meteor.clearInterval(Session.get("timeId"))
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
