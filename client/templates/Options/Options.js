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
  }
});
