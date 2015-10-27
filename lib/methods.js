Meteor.methods({
  "changeOutput": function (pins, values) {

    if (pins.length == values.length) {
      var cmd = [0]

      while (pins.length) {
        cmd.push(pins.pop())
        cmd.push(values.pop())
      }

      Serial.write(JSON.stringify(cmd))
    }
  },
  insert(){
    /*for each property inside the collection (ph,na,cl and k)*/
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        /*add in the empty object the last element of each collection*/
        for (var i = 0; i < 300; i++) {
          SensorCollections[property].insert({value:(Math.floor(Math.random() * 999) + 1 ),date: new Date(Date.now() + 900000*i)});
        }
      }
    };
  },
  remove(){
    for (var property in SensorCollections) {
      if (SensorCollections.hasOwnProperty(property)) {
        /*add in the empty object the last element of each collection*/
        SensorCollections[property].remove({});
      }
    };
  },
  updateOptions(selector,modifier){
    //Function to update the Options collection.
    if(selector.option){
      Options.update(selector,{$set:modifier});
      return true;
    }
    throw new Meteor.Error("Wrong collection", "idiot...");
  }
});
