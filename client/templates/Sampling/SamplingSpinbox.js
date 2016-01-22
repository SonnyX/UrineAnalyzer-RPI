Template.SamplingSpinbox.helpers({
  samplingFreq(){
    return Options.findOne({_id:'SamplingFreq-'+Meteor.userId()})
  }
});

Template.SamplingSpinbox.events({
  "change input": function(event, template){
    if(this.value != event.target.value){
      Meteor.call('samplingSpinboxUpdate',parseInt(event.target.value));
    }
  },
  "click #upButton, click #downButton":function(event,template){
    let value = template.$('input')[0].value;
    Meteor.call('samplingSpinboxUpdate',parseInt(value));
  }
});
