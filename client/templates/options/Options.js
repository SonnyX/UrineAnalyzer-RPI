//Gather all the SamplesAmount from the Options collection,
//setting reactivity to false for performances purposes and to avoid conflicts.
Template.Options.helpers({
  sensors: function(){
    return Options.find({'option':'SamplesAmount'},{reactive:false});
  }
});
