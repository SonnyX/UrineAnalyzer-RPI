Template.SamplingSpinbox.helpers({
  samplingFreq(){
    let samplingFreq = Options.findOne({_id:'SamplingFreq'})
    samplingFreq.value = samplingFreq.value/60000;
    return samplingFreq
  }
});

Template.SamplingSpinbox.events({
  "change input": function(event, template){
    if(this.value != event.target.value)
     Options.update({_id:'SamplingFreq'}, {$set:{
       value:parseInt(event.target.value)*60000 //milliseconds conversion
     }});
  },
  "click #upButton, click #downButton":function(event,template){
    let value = template.$('input')[0].value;
    Options.update({_id:'SamplingFreq'}, {$set:{
      value:parseInt(value)*60000
    }});
  }
});
