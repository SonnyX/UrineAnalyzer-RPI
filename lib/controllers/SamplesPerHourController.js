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
    label:'pH',
    href:'/data/ph'
  },
  na:{
    label:'Na',
    href:'/data/na',
    measure:'mmol/L'
  },
  k:{
    label:'K',
    href:'/data/k',
    measure:'mmol/L'
  },
  cl:{
    label:'Cl',
    href:'/data/cl',
    measure:'mmol/L'
  }
}
