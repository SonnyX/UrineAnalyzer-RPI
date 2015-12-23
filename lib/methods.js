Meteor.methods({
  dumpDatabase(){
    if(!this.isSimulation){
    }
  },
  'SamplesOptions.date':function(date){
    if(moment.isDate() || !isNaN(date)){
      Options.update({_id:'SamplesOptions'}, {$set:{date}})
      if(this.isSimulation){
        $('#SamplesOptions'+'.datetimepicker').data().DateTimePicker.date(date);
      }//update the date in the DateTimePicker
    }
  },
  'messages.clear'(_id){
    Messages.update({_id}, {$set:{
      active:false
    }});
  },
  'messages.show'(_id){
    Messages.update({_id}, {$set:{
      active:true
    }});
  },
  updatePhBufferDate(){
    let date = moment().startOf('day').toDate()
    Options.update({_id:'PhBuffer'}, {$set:{
      date:date
    }});
    if(this.isSimulation)//update the date in the DateTimePicker
      $('#PhBuffer'+'.datetimepicker').data().DateTimePicker.date(date);
    return 'PhBufferMsg';
  },
  samplingSignal(active){
    if(typeof active == 'boolean'){
      Options.update({_id:'SamplingFreq'}, {$set:{isActive:active}});
      if(active){
        let SamplingFreq = Options.findOne({_id:'SamplingFreq'})
        if(SamplingFreq.item == 'minute(s)'){
          SamplingFreq.value = SamplingFreq.value * 60000
        }
        else{
          SamplingFreq.value = SamplingFreq.value * 1000
        }
        let last = SensorsDB.analysis.findOne({},{sort:{firstDate:-1}})
        if(last){
          let date = last.firstDate + Math.floor(last.counter)/Math.floor(60*60000/last.frequency)*3.6e+6
          AnalysisController.insert(date,SamplingFreq);
        }
        else{
          AnalysisController.insert(+moment(),SamplingFreq);
        }
        //funcao para comeco de coleta
        /*if(!this.isSimulation){
          Services.call('startSampling', { samplingTime: 1000 })
        }*/
      }else {
        AnalysisController.removeEmpty();
        //funcao para termino de coleta
        /*if(!this.isSimulation){
          Services.call('stopSampling');
        }*/
      }
    }
  },
  setValve({valve,value}){
    if(!this.isSimulation){
      Services.call('setValve',{valve,value});
    }
  },
  setDutyCycle({pin,dutyCycle}){
    if(!this.isSimulation){
      Services.call('setDutyCycle',{pin,dutyCycle});
    }
  }
});

randomDataGenerator = function(){
  let random = function(){
    return Math.floor((Math.random() * 100) + 1);
  }
  let counter = 0
  return Meteor.setInterval(function(){
    if(Math.random() > 0){
      let date =(+moment());
      let data = [random(), random(), random(), random(),random(),random()];
      AnalysisController.dataReceived({data,date,counter})
      console.log('data: '+data+' counter: '+counter);
    }
    counter++;
  }, SensorsDB.analysis.findOne({}).frequency)
}
