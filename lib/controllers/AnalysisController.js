AnalysisController = {
  insertAnalysis(){
    let frequency = Options.findOne({_id:'SamplingFreq'}).value;
    let firstDate = +moment() + frequency*60000;
    let analysis = new Analysis({firstDate,frequency});
    SensorsDB.analysis.insert(analysis)
    return analysis
  },
  updateAnalysis(analysis,{counter}){
    let {firstDate} = analysis;
    SensorsDB.analysis.update({_id:analysis._id},{$set:{counter,firstDate}});
  },
  removeEmptyAnalysis(){
    SensorsDB.analysis.remove({counter:-1})
  },
  dataReceived({data,date,counter}){
    data = SamplesController.format(data);
    let analysis = SensorsDB.analysis.findOne({},{sort:{firstDate:-1}})
    if(!analysis.firstDate){
      analysis.setWithDelay({date,counter})
    }
    const difference = analysis.difference(counter)
    if(difference > 0){
      let aux = analysis.counter+(Math.floor(60/analysis.frequency));
      for (let i = 0; i < difference-1; i++){
        SamplesController.insertSamples(analysis,{counter:aux})
        aux = aux + (Math.floor(60/analysis.frequency));
      }
      SamplesController.insertSamples(analysis,{data,counter})
    }else{
      SamplesController.updateSamples(analysis,{data,counter})
    }
    this.updateAnalysis(analysis,{counter})
  }
}


/*dataReceived({data,date,counter}){
  data = this.format(data);
  let analysis = undefined;
  if(counter == 0 || SensorsDB.analysis.find({}).count() == 0){
    analysis = this.insertAnalysis({date,counter})
  }
  else{
    analysis = SensorsDB.analysis.findOne({},{sort:{firstDate:-1}})
    if (analysis.counter >= counter) {
      analysis = this.insertAnalysis({firstDate:date,counter})
    }
  }
  const difference = analysis.difference(counter)
  if(difference > 0){
    let aux = analysis.counter+(Math.floor(60/analysis.frequency));
    for (let i = 0; i < difference-1; i++){
      this.insertSamples(analysis,{counter:aux})
      aux = aux + (Math.floor(60/analysis.frequency));
    }
    this.insertSamples(analysis,{data,counter})
  }else{
    this.updateSamples(analysis,{data,counter})
  }
  this.updateAnalysis(analysis,{counter})
},*/
/*
insertAnalysis({date,counter}){
  let frequency = Options.findOne({_id:'SamplingFreq'}).value;
  const aux = Math.floor(counter/(Math.floor(60/frequency)))
  let firstDate = moment(date).subtract(aux,'hours').valueOf();
  if(arguments.length == 1){
    if((firstDate)!= undefined){
      let analysis = new Analysis({firstDate,frequency});
      SensorsDB.analysis.insert(analysis)
      return analysis
    }
  }
  throw Error('Wrong arguments');
}*/
