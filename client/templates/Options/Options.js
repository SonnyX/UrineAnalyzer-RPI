//Gather all the SamplesAmount from the Settings collection,
//setting reactivity to false for performances purposes and to avoid conflicts.

Template.Settings.helpers({
  samplesSettings(){
    //return 'SamplesSettings'
    //return Settings.findOne({_id:'SamplesSettings'})
  },
  pHBuffer(){
    //return 'PhBuffer'
    //return Settings.findOne({_id:'PhBuffer'});
  },
  calibrationOptions(){
    return Settings.findOne({_id:'Calibration'});
  },
  samplingFreq(){
    return Options.findOne({_id:'SamplingFreq-'+Meteor.userId()});
  }
});


Template.Settings.events({
  "click #restoreBtn": function(event, template){
    $('#restoreFile').click();
  },
  'change #restoreFile':function(event,template){
    let file = $(event.currentTarget).get(0).files[0];
    if(!file) return;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/database/restore', true);
    xhr.send(file);
  }
});
