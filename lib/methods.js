Meteor.methods({
  VerifiedCreateUser(user){
    if(!this.isSimulation){
      user.connection = this.connection;
      return Accounts.createUser(user);
    }
  },
  verifyConnection(){
    if(!this.isSimulation){
      return this.connection.clientAddress === '127.0.0.1' || Meteor.user()._createdBy === '/'
    }
  },
  DbToCSV(){
    let Data = Settings.findOne({_id:'Data'}).data;
    let data = [];
    Samples.find({}).map(function(sample,i){
      let analysis = Analysis.findOne(
        {_id:sample._id.substring(sample._id.indexOf('#')+1)}
      )
      let {timeStamp} = sample
      sample.samples.map(function(sample,i){
        if(i < analysis.counter+1){
          let momento = moment(timeStamp).add(i*analysis.frequency,'milliseconds')
          sample.Date = momento.format('DD/MM/YYYY');
          sample.Time = momento.format('HH:mm:ss');
          data.push(sample);
        }
      })
    })
    return Papa.unparse(data)
  },
  'SamplesOptions.date':function(date){
    if(moment.isDate() || !isNaN(date)){
      Options.update({_id:'SamplesOptions-'+Meteor.userId()}, {$set:{date}})
      if(this.isSimulation){
        $('#SamplesOptions-'+Meteor.userId()+'.datetimepicker').data().DateTimePicker.date(date);
      }//update the date in the DateTimePicker
    }
  },
  'messages.show'(message){
    if(this.isSimulation){
      console.log(message);
      Messages.insert(message);
    }
  },
  'messages.clear'(){
    if(this.isSimulation){
      Messages.remove({});
    }
  },
  updatePhBufferDate(){
    let date = moment().startOf('day').toDate()
    Settings.update({_id:'PhBuffer'}, {$set:{
      date:date
    }});
    if(this.isSimulation){
      if($('#PhBuffer'+'.datetimepicker').data())
        $('#PhBuffer'+'.datetimepicker').data().DateTimePicker.date(date);
    }
    return 'PhBufferMsg';
  },
  'Settings.ChangeDate'(selector,date){
    Settings.update(selector, {$set:{date}});
  },
  'Options.ChangeDate'(selector,date){
    Options.update(selector, {$set:{date}});
  },
  startSampling(){
    if(!Settings.findOne({_id:'ActionsLicense'}).released){
      throw new Meteor.Error(402, "You're not authorized to Start sampling");
    }
    let SamplingFreq = Options.findOne({_id:'SamplingFreq-'+Meteor.userId()})
    if(SamplingFreq.item == 'minute(s)'){
      SamplingFreq.value = SamplingFreq.value * 60000
    }
    else{
      SamplingFreq.value = SamplingFreq.value * 1000
    }
    //funcao para comeco de coleta
    if(!this.isSimulation){
      AnalysisController.insert(+moment(),SamplingFreq);
      Services.call('startSampling', { samplingTime: SamplingFreq.value },Meteor.bindEnvironment(
        function(status,result){
          if(status == 'success'){
            Settings.update({_id:'SamplingState'}, {$set:{value:true}});
          }
      }))
    }
  },
  stopSampling(){
    if(!Settings.findOne({_id:'ActionsLicense'}).released){
      throw new Meteor.Error(402, "You're not authorized to Stop sampling");
    }
    AnalysisController.removeEmpty();
    //funcao para termino de coleta
    if(!this.isSimulation){
      Services.call('stopSampling',{}, Meteor.bindEnvironment(function(status,result){
        if(status == 'success'){
          Settings.update({_id:'SamplingState'}, {$set:{value:false}});
        }
      }));
    }
  },
  configureLocks({_id,id,value}){
    if(!this.isSimulation){
      Services.call('configureLocks',[{id,value}],Meteor.bindEnvironment(function(status,result){
        if(status =='success'){
          Outputs.update({_id}, {$set:{
            value
          }});
        }
      }))
    }
  },
  'Outputs.update':function(_id,id,value){
    if(!this.isSimulation){
      Future = Npm.require('fibers/future');
      let future = new Future()
      Services.call(
        `configure${Outputs.findOne({'outputs._id':_id})._id}`,
        [{id,value}],
        Meteor.bindEnvironment(function(status,result){
          if(status=='success'){
            Outputs.update({'outputs._id':_id}, {$set:{
              'outputs.$.start':value
            }});
            future['return']('success');
          }
          else{
            future['return']( new Meteor.Error(402, "Not authorized"))
          }
      }))
      return future.wait();
    }
  }
});

if(Meteor.isServer){
  Meteor.methods({
    createAdmin(){
      if(!Meteor.users.find({}).count()){
        Accounts.createUser({
          username:'admin',
          password:'admin',
          connection:{clientAddress:'127.0.0.1'},
        })
      }
    }
  });
}

randomDataGenerator = function(){
  let random = function(){
    return Math.floor((Math.random() * 100) + 1);
  }
  let counter = 0
  return Meteor.setInterval(function(){
    if(Math.random() > 0){
      let date =(+moment());
      //let data = [random(), random(), random(), random(),random(),random()];
      let data = {ph:random(),na:random(),k:random(),cl:random(),volume:random(),conductivity:random()}
      AnalysisController.dataReceived({data,date,counter})
      //console.log('data: '+data+' counter: '+counter);
    }
    counter++;
  }, Analysis.findOne({},{sort:{firstDate:-1}}).frequency)
}
