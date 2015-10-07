var SerialPort = Meteor.npmRequire("serialport")

Serial = {

  "options": {
    baudrate: 115200,
    parser: SerialPort.parsers.readline("\n")
  }, 
  
  "portId": undefined,

  "portHandle": undefined,
  
  "callbacks": {
    updateOutput: function(args) {
      var pins = args.pins;
      var values = args.values;

      if (pins.length == values.length) {
        for (i = 0; i < pins.length; i++) {
          var state = { pin: pins[i], value: values[i] }
          console.log(state)
          Outputs.update(state)
        }
      }
    },
    sensorReading: function(args) { 
    //  console.log("Sensor: " + args.value) 
    }
  },

  "connect": function () {
    SerialPort.list(Meteor.bindEnvironment(function (error, ports) {
      ports.forEach(function (port) {
        console.log(port)
        Serial.portId = port.pnpId
        Serial.portHandle = new SerialPort.SerialPort(port.comName, Serial.options)
        Serial.portHandle.on("open", Meteor.bindEnvironment(function () {
          Serial.opened()
        }))
      })
    }))
  },

  "opened": function () {
    console.log("=> Serial: Connected")
    Serial.portHandle.on("data", Meteor.bindEnvironment(function (data) {
      try {
        var msg = JSON.parse(data)
        console.log("Serial >> " + data)

        if (msg.hasOwnProperty('id')) {
          callback = Serial.callbacks[msg.id]
          callback(msg.args)
        }
      }
      catch (err) {
        console.log(err.message)
      }
    }))
  },

  // Make sure the serial connection is still valid
  "watchdog": function () {
    if (typeof Serial.portHandle == "undefined") {
      console.log("=> Serial: Attempting to connect!")
      Serial.connect()    
    }
    else {
      SerialPort.list(Meteor.bindEnvironment(function (error, ports) {
        var found = _.find(ports, function(port) {
          return port.pnpId == Serial.portId
        })

        if (typeof found == "undefined") {
          console.log("=> Serial: Connection Lost!")
          Serial.portHandle = undefined
        }
      }))
    }
  },

  "write": function(msg) {
    if (Serial.portHandle) {
      console.log("Serial << " + msg)
      
      Serial.portHandle.write(msg, function (error, results) {
        if (error) console.log("Write Error: " + results)
      })
    }
  }

}