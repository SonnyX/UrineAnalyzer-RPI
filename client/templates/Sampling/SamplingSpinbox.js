Template.SamplingSpinbox.helpers({
  samplingFreq(){
    return Options.findOne({_id:'SamplingFreq-'+Meteor.userId()})
  }
});

Template.SamplingSpinbox.events({
  "change input": function(event, template){
    if(this.value != event.target.value)
      Options.update({_id:'SamplingFreq-'+Meteor.userId()}, {$set:{
        value:parseInt(event.target.value) //milliseconds conversion
      }
    });
  },
  "click #upButton, click #downButton":function(event,template){
    let value = template.$('input')[0].value;
    Options.update({_id:'SamplingFreq-'+Meteor.userId()}, {$set:{
      value:parseInt(value)
    }});
  }
});
