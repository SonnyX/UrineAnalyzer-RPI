Analysis = class Analysis {
  constructor(doc){
    if(doc){
      let {frequency,firstDate,_id} = doc;
      if((frequency)!= undefined){
        if(!_id){
          this._id = new Mongo.Collection.ObjectID().valueOf()
          this.firstDate = firstDate || null;
          this.frequency = frequency;
          this.counter = -1;
          return;
        }
      }
    _.extend(this,doc)
    return
    }
    throw Error('No argument passed')
  }
  setfirstDate(date){
    this.firstDate = date
  }
  setWithDelay({date,counter}){
    const delay = Math.floor(counter/Math.floor((60/this.frequency)))
    this.setfirstDate(date - (delay*3.6e+6/*1 hour*/))
  }
  difference(counter){
    const currentV = Math.floor(this.counter/Math.floor(60/this.frequency))
    const newV = Math.floor(counter/Math.floor(60/this.frequency))
    return  (newV - currentV);
  }
  insert({data,counter}){
    let {_id,firstDate,frequency} = this
    let newPerHour = new SamplesPerHour(
      {_id:_id,firstDate:firstDate,frequency:frequency,counter}
    )
    if(data){
      newPerHour.addData(this,{data,counter})
    }
    this.counter = counter
    return newPerHour
  }
  update({data,counter}){
    const hours = Math.floor(counter/(Math.floor(60/this.frequency)))
    let date = moment(this.firstDate).add(hours,'hours').format('DDMMYYYYHHmmSSZZ')
    const position = (counter%(Math.floor(60/this.frequency)))
    let selector = date +'#' + this._id;
    let modifier = {}
    for (var property in data) {
      if (data.hasOwnProperty(property)) {
        modifier['samples.'+ position + '.' + property] = data[property];
      }
    }
    return {selector,modifier}
  }
}
