Meteor.methods({
  "changeOutput": function (pins, values) {
    if(!this.isSimulation){
      if (pins.length == values.length) {
        var cmd = [0]

        while (pins.length) {
          cmd.push(pins.pop())
          cmd.push(values.pop())
        }
        Serial.write(JSON.stringify(cmd))
      }
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
  insert(){
    for (var i = 0; i < 96; i++) {
      let date = new Date(Date.now() - 900000*i)
      SensorCollections.ph.insert({value:(Math.floor(Math.random() * 14) + 1 ),date});
      SensorCollections.na.insert({value:(Math.floor(Math.random() * 200) + 1 ),date});
      SensorCollections.k.insert({value:(Math.floor(Math.random() * 200) + 1 ),date});
      SensorCollections.cl.insert({value:(Math.floor(Math.random() * 200) + 1 ),date});
    }
  },
  remove(){
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        if(typeof SensorCollections[property] == 'object'){
          /*add in the empty object the last element of each collection*/
          SensorCollections[property].remove({});
        }
      }
    };
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
  randomDataGenerator(){
    let random = function(){
      return Math.floor((Math.random() * 100) + 1);
    }
    if (!this.isSimulation) {
      for (let counter = 0; counter <10; counter++) {
        if(Math.random() > 0){
          let date =(+moment());
          let data = [random(), random(), random(), random(),random(),random()];
          console.log('data: '+data+' counter: '+counter);
          AnalysisController.dataReceived({data,date,counter})
        }
      }
    }
  },
  samplingSignal(active){
    if(typeof active == 'boolean'){
      Options.update({_id:'SamplingFreq'}, {$set:{isActive:active}});
      if(active){
        let SamplingFreq = Options.findOne({_id:'SamplingFreq'})
        let last = SensorsDB.analysis.findOne({},{sort:{firstDate:-1}})
        if(last){
          let date = last.firstDate + Math.floor(last.counter)/Math.floor(60*60000/last.frequency)*3.6e+6
          AnalysisController.insert(date,SamplingFreq);
        }
        else{
          AnalysisController.insert(+moment(),SamplingFreq);
        }
        //funcao para comeco de coleta
        if(!this.isSimulation){
          Services.call('startSampling', { samplingTime: 1000 })
        }
      }else {
        AnalysisController.removeEmpty();
        //funcao para termino de coleta
        if(!this.isSimulation){
          Services.call('stopSampling');
        }
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
  }, 2000)
}
