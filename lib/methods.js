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
  insert(){
    /*for each property inside the collection (ph,na,cl and k)*/
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        /*add in the empty object the last element of each collection*/
        for (var i = 0; i < 96; i++) {
          SensorCollections[property].insert({value:(Math.floor(Math.random() * 999) + 1 ),date: new Date(Date.now() + 900000*i)});
        }
      }
    };
  },
  remove(){
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        /*add in the empty object the last element of each collection*/
        SensorCollections[property].remove({});
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
  }
});
