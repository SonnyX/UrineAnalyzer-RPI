let _ = Npm.require('underscore')

function find(array, prop, value) {
  let result = _.find(array, (obj) => obj[prop] == value)
  if (typeof result === 'undefined') {
    throw `invalid ${prop}: ${value}`
  }
  return result
}

let MessageTypes = [
  {
    id: 0x00,
    type: 'request',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    },
    parse(packet) {
      /*
       * Parser service request made by the MSP. (MSP -> RPI)
       */
      let requestId = packet.readUInt8(0)
      let service = find(ServerServices, 'id', requestId)

      let args = service.deserialize(packet.slice(1))

      return {
        args,
        id: this.id,
        type: this.type,
        service: service.service
      }
    },
    create(service, args) {
      /*
       * Send service request to the MSP (RPI -> MSP)
       */
      let buffer = new Buffer(64)
      buffer.writeUInt8(0x21, 0) // start of packet

      let serv = find(ClientServices, 'service', service)

      let size = 2
      size += this.serialize(buffer, size)
      size += serv.serialize(buffer, size, args)

      buffer.writeUInt8(size - 2, 1)
      return buffer.slice(0, size)
    }
  },
  {
    id: 0x01,
    type: 'response',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    },
    parse(packet) {
      /*
       * Parse MSP response to a previous request
       * made by the RPI (MSP -> RPI)
       */
      let requestId = packet.readUInt8(0)
      let service = find(ClientServices, 'id', requestId)

      let statusId = packet.readUInt8(1)
      let status = find(ResponseStatus, 'id', statusId)

      let args = service.deserialize(packet.slice(2))

      return {
        args,
        id: this.id,
        type: this.type,
        status: status.status,
        service: service.service
      }
    },
    create(service, args) {
      /*
       * Create response to a previous request
       * made by the MSP (RPI -> MSP)
       */
      let buffer = new Buffer(64)
      buffer.writeUInt8(0x21, 0) // start of packet

      let serv = find(ServerServices, 'service', service)

      let size = 2
      size += this.serialize(buffer, size)
      size += serv.serialize(buffer, size, args)

      buffer.writeUInt8(size - 2, 1)
      return buffer.slice(0, size)
    }
  }
]


let ResponseStatus = [
  {
    id: 0x00,
    status: 'success',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    }
  },
  {
    id: 0x01,
    status: 'invalid service',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    }
  },
  {
    id: 0x02,
    status: 'invalid length',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    }
  },
  {
    id: 0x03,
    status: 'invalid arg',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    }
  },
  {
    id: 0x04,
    status: 'busy',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    }
  },
  {
    id: 0xFF,
    status: 'service not implemented',
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    }
  }
]

let ServerServices = [
  {
    id: 0x00,
    service: "New ADC sample",
    deserialize(payload) {
      /*
      if (payload.length != 14) {
        reply(this.service, { status: 'invalid length' })
        throw `invalid packet length ${payload.length}`
      }
      */

      reply(this.service, { status: 'success' })
      let result = {
        ph: {
          raw: payload.readUInt16BE(0),
          voltage: payload.readUInt16BE(0)*3.3/16384.0
        },
        na: {
          raw: payload.readUInt16BE(2),
          voltage: payload.readUInt16BE(2)*3.3/16384.0
        },
        cl: {
          raw: payload.readUInt16BE(4),
          voltage: payload.readUInt16BE(4)*3.3/16384.0
        },
        k: {
          raw: payload.readUInt16BE(6),
          voltage: payload.readUInt16BE(6)*3.3/16384.0
        },
        conductivity: {
          raw: payload.readUInt16BE(8),
          voltage: payload.readUInt16BE(8)*3.3/16384.0
        },
        preheater: {
          raw: payload.readUInt16BE(10),
          voltage: payload.readUInt16BE(10)*3.3/16384.0,
          temperature: '?'
        },
        heater: {
          raw: payload.readUInt16BE(12),
          voltage: payload.readUInt16BE(12)*3.3/16384.0,
          temperature: 0.0037007729*payload.readUInt16BE(12) + 9.2201522894
        },
        sd1: payload.readUInt16BE(14),
        sd2: payload.readUInt16BE(16),
        //timestamp: payload.readUIntBE(18, 6),
        counter: payload.readUInt32BE(24)
      }

      return result
    },
    serialize(buffer, offset, args) {
      return 0;
    }
  },
  {
    id: 0x01,
    service: "Time Synchronization",
    deserialize(payload) {
      reply(this.service, { status: 'success' })
    },
    serialize(buffer, offset, args) {
      let time = new Date().getTime()
      buffer.writeUIntBE(time, offset, 6)
      return 6;
    }
  }
]

let ClientServices = [
  {
    id: 0x00,
    service: "configureMotor",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      buffer.writeUInt8(args.motorId, offset + 1)
      return 2;
    },
    deserialize(payload) {
      return { }
    }
  },
  {
    id: 0x01,
    service: "configureValve",
    serialize(buffer, offset) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    },
    deserialize(payload) {
      return { }
    }
  },
  {
    id: 0x02,
    service: "startSampling",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      buffer.writeUInt16BE(args.samplingTime, offset+1)
      return 3;
    },
    deserialize(payload) {
      let samplingTime = payload.readUInt16BE(0)
      return { samplingTime }
    }
  },
  {
    id: 0x03,
    service: "stopSampling",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    },
    deserialize(payload) {
      return { }
    }
  },
  {
    id: 0x04,
    service: "setDutyCycle",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      buffer.writeUInt8(args.pin, offset + 1)
      buffer.writeUInt32BE(args.dutyCycle, offset + 2)
      return 6;
    },
    deserialize(payload) {
      let pin = payload.readUInt8(0)
      let dutyCycle = payload.readUInt32BE(1)
      return { pin, dutyCycle }
    }
  },
  {
    id: 0x05,
    service: "setValve",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      buffer.writeUInt8(args.valve, offset + 1)
      buffer.writeUInt8(args.value, offset + 2)
      return 3;
    },
    deserialize(payload) {
      let valve = payload.readUInt8(0)
      let value = payload.readUInt8(1)
      return { valve, value }
    }
  },
  {
    id: 0x06,
    service: "sdLeds",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      buffer.writeUInt8(args.value, offset + 1)
      return 2;
    },
    deserialize(payload) {
      let value = payload.readUInt8(0)
      return { value }
    }
  },
  {
    id: 0xFF,
    service: "blinkLed",
    serialize(buffer, offset, args) {
      buffer.writeUInt8(this.id, offset)
      return 1;
    },
    deserialize(payload) {
      return { }
    }
  }
]

let serialHandle;
let onData = function() {}

function parse(packet) {
  try {
    let typeId = packet.readUInt8(0)
    let type = find(MessageTypes, 'id', typeId)
    return type.parse(packet.slice(1))
  }
  catch (error) {
    console.log(`Parsing error: ${error.message}`)
  }
}

function call(service, args) {
  let request = find(MessageTypes, 'type', 'request')
  let packet = request.create(service, args)
  serialHandle.write(packet);
}

function reply(service, args) {
  let response = find(MessageTypes, 'type', 'response')
  let packet = response.create(service, args)
  serialHandle.write(packet)
}

Services = {
  initialize: function (continuation) {
    serialHandle = new Serial(function () {
      serialHandle.on('data', function (data) {
        onData(parse(data))
      })
      continuation();
    })
  },

  call: call,

  subscribe: function (callback) {
    onData = callback
  }
}
