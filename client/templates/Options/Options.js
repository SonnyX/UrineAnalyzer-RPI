//Gather all the SamplesAmount from the Options collection,
//setting reactivity to false for performances purposes and to avoid conflicts.

Template.Options.helpers({
  samplesOptions(){
    //return 'SamplesOptions'
    //return Options.findOne({_id:'SamplesOptions'})
  },
  pHBuffer(){
    //return 'PhBuffer'
    //return Options.findOne({_id:'PhBuffer'});
  },
  calibrationOptions(){
    return Options.findOne({_id:'CalibrationOptions'});
  },
  samplingFreq(){
    return Options.findOne({_id:'SamplingFreq'});
  }
});


Template.Options.events({
  "click #restoreBtn": function(event, template){
    $('#restoreFile').click();
  },
  'change #restoreFile':function(event,template){
    let file = $(event.currentTarget).get(0).files[0];
    if(!file) return;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/restore', true);
    xhr.send(file);
  }
});
