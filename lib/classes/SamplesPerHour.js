SamplesPerHour = class SamplesPerHour{
  constructor({_id,firstDate,frequency,counter}){
    let analysisTime = moment(firstDate)
    let thisTime = analysisTime.add(Math.floor(counter/Math.floor(60*60000/frequency)),'hours')
    this.timeStamp = thisTime.valueOf();
    this._id = thisTime.format('DDMMYYYYHHmmSSZZ')+ '#' + _id;
    this.samples = this.samplesArray(frequency)
  }
  addData({frequency},{data,counter}){
    let sample = this.samples[counter%(Math.floor(60*60000/frequency))];
    for (var i = 0; i < sample.length; i++) {
      sample[i] = data[i]
    }
  }
  samplesArray(frequency){
    const length = Math.floor(60*60000/frequency);
    let array = new Array(length);
    for (var i = 0; i < length; i++) {
      array[i] = SamplesController.format()
    }
    return array;
  }
}
