SamplesPerHour = class SamplesPerHour{
  constructor({_id,firstDate,frequency,counter}){
    let analysisTime = moment(firstDate)
    let thisTime = analysisTime.add(Math.floor(counter/Math.floor(60*60000/frequency)),'hours')
    this.timeStamp = thisTime.valueOf();
    this._id = thisTime.format('DDMMYYYYHHmmssZZ')+ '#' + _id;
    this.samples = this.samplesArray(frequency)
    this.calibration = this.calibrationArray(Settings.findOne({_id:'Calibration'}).item)
  }
  addSample({frequency},{data,counter}){
    let sample = this.samples[counter%(Math.floor(60*60000/frequency))];
    for (var property in sample) {
      if (sample.hasOwnProperty(property)) {
        sample[property] = data[property];
      }
    }
  }
  addCalibration({frequency},{data,counter}){
    let calibration = this.calibration[counter%(Math.floor(60*60000/Settings.findOne({_id:'Calibration'}).item))];
    for (var property in calibration) {
      if (calibration.hasOwnProperty(property)) {
        calibration[property] = data[property];
      }
    }
  }
  samplesArray(frequency){
    const length = Math.floor(60*60000/frequency);
    let array = new Array(length);
    let data = {};
    Settings.findOne({_id:'Data'}).data.map(function(i){
      data[i._id] = null;
    });
    for (var i = 0; i < length; i++) {
      array[i] = data;
    }
    return array;
  }
  calibrationArray(frequency){
    const length = 60/frequency;
    let data = {
      "6_8" : {
        "ph" : null,
        "k" : null,
        "cl" : null,
        "na" : null,
        "conductivity" : null,
        "temp" : null
      },
      "7_3" : {
        "ph" : null,
        "k" : null,
        "cl" : null,
        "na" : null,
        "conductivity" : null,
        "temp" : null
      }
    };
    let array = new Array(length);
    for (var i = 0; i < length; i++) {
      array[i] = data
    }
    return array;
  }
}
