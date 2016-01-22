SamplesController = {
  insert(analysis,{data,counter}){
    counter = counter - (analysis.virtual||0);
    Samples.insert(analysis.insert({data,counter}));
  },
  update(analysis,{data,counter}){
    counter = counter - (analysis.virtual||0)
    let {selector,modifier} = analysis.update({data,counter})
    Samples.update(selector,{$set:modifier});
  },
  format2(){
    let length = Settings.findOne({_id:'Data'}).data.length
    data = new Array(length)
    for (var i = 0; i < length ; i++) {
      data[i] = null;
    }
    return data
  },
  format(){
    let data = {};
    Settings.findOne({_id:'Data'}).data.map(function(datum){
      data[datum._id] = null;
    });
    return data;
  }
}
