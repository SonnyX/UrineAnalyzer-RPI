SamplesController = {
  insert(analysis,{data,counter}){
    counter = counter - (analysis.virtual||0);
    SensorsDB.samplesPerHour.insert(analysis.insert({data,counter}));
  },
  update(analysis,{data,counter}){
    counter = counter - (analysis.virtual||0)
    let {selector,modifier} = analysis.update({data,counter})
    SensorsDB.samplesPerHour.update(selector,{$set:modifier});
  },
  format(){
    let length = Options.findOne({_id:'Data'}).data.length
    data = new Array(length)
    for (var i = 0; i < length ; i++) {
      data[i] = null;
    }
    return data
  }
}
