Meteor.methods({
  "changeOutput": function (pins, values) {
    if (pins.length == values.length) {
      var cmd = [0]

      while (pins.length) {
        cmd.push(pins.pop())
        cmd.push(values.pop())
      }

      Serial.write(JSON.stringify(cmd))
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
  verifyOptions(){
    if(!Options.find({}).count()){
      Options.insert([
        {_id:'TopMenuItems',leftItems:[{label:'Menu',icon:'grid layout'}],rightItems:[{label:'Login',icon:'sgin in'}]},
        {_id:'SideMenuItems',items:[{label:'Overview',icon:'grid layout',href:'/'},{label:'Data',icon:'Doctor',items:
          [{label:'pH',href:'/data/ph'},{label:'Na',href:'/data/na'},{label:'K',href:'/data/k'},{label:'Cl',href:'/data/cl'}]
        }]},
        {_id:'SamplesOptions',items:[10,20,30,40,50,'All'],item:10,date:moment().startOf('day').toDate()},
        {_id:'CalibrationOptions',item:30,items:[30,60]},
        {_id:'SamplingFreq',value:'15'},
        {_id:'PhBuffer',date:moment().startOf('day').toDate()}
      ])
    }
  },
  randomDataGenerator(){
    let random = function(){
      return Math.floor((Math.random() * 100) + 1);
    }
    if (!this.isSimulation) {
      for (let counter = 0; counter <10; counter++) {
        if(Math.random() > 0){
          let date =(+moment());
          let data = [random(), random(), random(), random()];
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
        let last = SensorsDB.analysis.findOne({},{sort:{firstDate:-1}})
        if(last){
          let date = last.firstDate + Math.floor(last.counter)/Math.floor(60/last.frequency)*3.6e+6
          AnalysisController.insert(date);
        }
        else{
          AnalysisController.insert(+moment());
        }
        //funcao para comeco de coleta
      }else {
        AnalysisController.removeEmpty();
        //funcao para termino de coleta
      }
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
      let data = [random(), random(), random(), random()];
      AnalysisController.dataReceived({data,date,counter})
      console.log('data: '+data+' counter: '+counter);
    }
    counter++;
  }, 2000)
}
