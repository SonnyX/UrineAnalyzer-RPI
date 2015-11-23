AnalysisController = {
  insert(date){
    let frequency = Options.findOne({_id:'SamplingFreq'}).value;
    let firstDate = date + frequency*60000;
    let analysis = new Analysis({firstDate,frequency});
    SensorsDB.analysis.insert(analysis)
    return analysis
  },
  _expand({_id,firstDate,frequency,counter}){
    let analysis = new Analysis({
      _id:_id + '+',
      firstDate: firstDate + (Math.floor(counter/Math.floor(60/frequency))+1)*3.6e+6,
      frequency,
      virtual:counter+1
    });
    SensorsDB.analysis.insert(analysis)
  },
  update(analysis,{counter}){
    let {firstDate} = analysis;
    counter = counter - (analysis.virtual||0)
    SensorsDB.analysis.update({_id:analysis._id},{$set:{counter,firstDate}});
  },
  removeEmpty(){
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
        SamplesController.insert(analysis,{counter:aux})
        aux = aux + (Math.floor(60/analysis.frequency));
      }
      SamplesController.insert(analysis,{data,counter})
    }else{
      SamplesController.update(analysis,{data,counter})
    }
    this.update(analysis,{counter})
    if(analysis.isLastCounter()){
      this._expand(analysis)
    }
  }
}
