// Check serial connection every 5s
Meteor.startup(function () {
  /*Meteor.setInterval(function () {
    Serial.watchdog();
  }, 10000);*/
});

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

  }
});
