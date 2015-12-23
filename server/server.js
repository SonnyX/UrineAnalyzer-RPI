Meteor.startup(function () {
  /*Meteor.setInterval(function () {
    Serial.watchdog();
  }, 10000);*/

  /*Services.initialize(Meteor.bindEnvironment(function () {

  	Services.subscribe(Meteor.bindEnvironment(function (data) {
      console.log(data);
      if(data.id == 0){
        let datum = [
          data.args.ph.raw,
          data.args.na.raw,
          data.args.k.raw,
            data.args.cl.raw,
          0,
          data.args.conductivity.raw
        ]
        AnalysisController.dataReceived({data:datum,date:+moment(),counter:data.args.counter})
      }
  	}))
  }));*/
})
