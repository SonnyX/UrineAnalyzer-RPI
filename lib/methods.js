Meteor.methods({
  'Outputs.update':function(_id,start){
    if(!this.isSimulation){
      Outputs.update({_id},{$set:{start}})
    }
  },
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
          let aux = {}
          sample.map(function(s,i){
            aux[Data[i].label] = s;
          })
          let momento = moment(timeStamp).add(i*analysis.frequency,'milliseconds')
          aux.Date = momento.format('DD/MM/YYYY');
          aux.Time = momento.format('HH:mm:ss');
          data.push(aux)
        }
      })
    })
    return Papa.unparse(data)
  },
  dumpDatabase(){
    if(!this.isSimulation){
    }
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
    Settings.update({_id:'SamplingState'}, {$set:{value:true}});
    let SamplingFreq = Options.findOne({_id:'SamplingFreq-'+Meteor.userId()})
    if(SamplingFreq.item == 'minute(s)'){
      SamplingFreq.value = SamplingFreq.value * 60000
    }
    else{
      SamplingFreq.value = SamplingFreq.value * 1000
    }
    AnalysisController.insert(+moment(),SamplingFreq);
    //funcao para comeco de coleta
    /*if(!this.isSimulation){
      Services.call('startSampling', { samplingTime: 1000 })
    }*/
  },
  stopSampling(){
    if(!Settings.findOne({_id:'ActionsLicense'}).released){
      throw new Meteor.Error(402, "You're not authorized to Stop sampling");
    }
    AnalysisController.removeEmpty();
    //funcao para termino de coleta
    /*if(!this.isSimulation){
      Services.call('stopSampling');
    }*/
  },
  samplingSignal(active){
    if(!Settings.findOne({_id:'ActionsLicense'}).released){
      if(active)
        throw new Meteor.Error(402, "You're not authorized to Start sampling");
      throw new Meteor.Error(402, "You're not authorized to Stop sampling");
    }
    if(typeof active == 'boolean'){
      Settings.update({_id:'SamplingState'}, {$set:{value:active}});
      if(active){
        let SamplingFreq = Options.findOne({_id:'SamplingFreq-'+Meteor.userId()})
        if(SamplingFreq.item == 'minute(s)'){
          SamplingFreq.value = SamplingFreq.value * 60000
        }
        else{
          SamplingFreq.value = SamplingFreq.value * 1000
        }
        let last = Analysis.findOne({},{sort:{firstDate:-1}})
        if(last){
          //let date = last.firstDate + Math.floor(last.counter)/Math.floor(60*60000/last.frequency)*3.6e+6
          AnalysisController.insert(+moment(),SamplingFreq);
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
      //let data = [random(), random(), random(), random(),random(),random()];
      let data = {ph:random(),na:random(),k:random(),cl:random(),volume:random(),conductivity:random()}
      AnalysisController.dataReceived({data,date,counter})
      //console.log('data: '+data+' counter: '+counter);
    }
    counter++;
  }, Analysis.findOne({},{sort:{firstDate:-1}}).frequency)
}
