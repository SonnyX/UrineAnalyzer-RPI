Template.SamplesGrid.helpers({
  samples: function(){
    let perHour = SensorsDB.samplesPerHour.findOne({},{sort:{timeStamp:-1}})
    let {samples,timeStamp} = perHour || {samples:[SamplesController.format()]}
    let array = []
    for (var i = samples.length; i > 0 ; i--) {
      for (var property in samples[i-1]) {
        if (samples[i-1].hasOwnProperty(property)) {
          if(samples[i-1][property] != null || (i-1) == 0){
            let {label,measure} = Options.findOne({_id:property})
            let type=property,value=samples[i-1][property]||'No Value';
            array.push({type,value,label,measure,timeStamp})
          }
        }
      }
      if(array.length){
        return array
      }
      array = []
    }
  }
});
