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
  format(data=[null,null,null,null]){
    let [ph,na,k,cl] = data
    return {ph,na,k,cl}
  },
  ph:{
    _id:'ph',
    label:'pH',
  },
  na:{
    _id:'na',
    label:'Na',
    measure:'mmol/L'
  },
  k:{
    _id:'k',
    label:'K',
    measure:'mmol/L'
  },
  cl:{
    _id:'cl',
    label:'Cl',
    measure:'mmol/L'
  }
}
