Template.Options.helpers({
  sensors: function(){
    return Options.find({'option':'SamplesAmount'},{reactive:false});
  }
});
