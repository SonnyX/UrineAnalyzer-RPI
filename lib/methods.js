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
        SensorCollections[property].insert({value:(Math.floor(Math.random() * 999) + 1 ),date: new Date()});
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
  }
});
