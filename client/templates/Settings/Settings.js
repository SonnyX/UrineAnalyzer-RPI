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
    return Settings.findOne({_id:'SamplingFreq'});
  },
  localHost(){
    if(!Meteor.userId()){
      return true;
    }
  }
});

Template.Settings.events({
  "click #cleanSamples": function(event, template){
     Meteor.call('cleanSamples',function(error,result){
       if(error){
         Messages.newErrorMsg(error);
       }
     });
  },
  "click #calibrateBtn":function(event){
    event.preventDefault();
    Meteor.call('execOnServer','bundle/cal_ts.sh',function(error,result){
      if(error){
        Messages.newErrorMsg(error);
        return
      }
      Messages.insert({
        msg:result,
        options:{
          closeBtn:true,
          type:'info'
        }
      })
    })
  }
});
