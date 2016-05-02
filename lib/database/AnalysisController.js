AnalysisController = {
  insert(firstDate,{value}){
    let analysis = new AnalysisClass({firstDate,frequency:value});
    Analysis.insert(analysis)
    return analysis
  },
  _expand({firstDate,frequency,counter,virtual}){
    let analysis = new AnalysisClass({
      firstDate: firstDate + (counter+1)*frequency,
      frequency,
      virtual:counter+(virtual||0)+1
    });
    Analysis.insert(analysis)
  },
  update(analysis,{counter}){
    let {firstDate} = analysis;
    counter = counter - (analysis.virtual||0)
    Analysis.update({_id:analysis._id},{$set:{counter,firstDate}});
  },
  removeEmpty(){
    Analysis.remove({counter:-1})
  },
  dataReceived({data,date,counter}){
    let analysis = Analysis.findOne({},{sort:{firstDate:-1}});
    if(!analysis.firstDate){
      analysis.setWithDelay({date,counter})
    }
    const difference = analysis.difference(counter)
    if(difference == 1){ //Insert a new sample.
      let fakeCounter = counter - (analysis.virtual||0);
      Samples.insert( analysis.insert( { data, counter: fakeCounter } ) );
    } else if(difference > 1){ //Insert a empty sample for every diference, and insert a new sample.
      let aux = analysis.counter+(Math.floor(60*60000/analysis.frequency)) - (analysis.virtual||0);
      console.log("difference:");
      console.log(difference);
      console.log("aux:");
      console.log(aux);
      for (let i = 0; i < difference-1; i++){
        Samples.insert(analysis.insert({data: null, counter: aux}));
        aux = aux + (Math.floor(60*60000/analysis.frequency));
      }
      console.log("aux:");
      console.log(aux);
      let fakeCounter = counter - (analysis.virtual||0);
      Samples.insert( analysis.insert( { data, counter: fakeCounter } ) );
    } else {
      //this counter already exists and therefor update it instead.
      let fakeCounter = counter - (analysis.virtual||0);
      let {selector,modifier} = analysis.update({data, counter: fakeCounter})
      Samples.update(selector,{$set:modifier});
    }
    this.update(analysis,{counter})
  }
}
