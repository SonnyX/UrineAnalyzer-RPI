  
Services.rpi.methods.deserialize = function (id, packet) {
  try {
    let service = Services.utils.find(Services.rpi.methods.map, 'id', id)
    return {
      method: service.method,
      args: service.deserialize(packet)
    }
  }
  catch (error) {
    throw new Error(`Rpi methods deserialize throwed: ${error}`)
  }
}

Services.rpi.methods.map = [
  {
    id: 0x00,
    method: "storeSample",
    deserialize(packet) {
      let result = {
        ph: {
          raw: packet.readUInt16BE(0),
        },
        na: {
          raw: packet.readUInt16BE(2),
        },
        cl: {
          raw: packet.readUInt16BE(4),
        },
        k: {
          raw: packet.readUInt16BE(6),
        },
        conductivity: {
          raw: packet.readUInt16BE(8),
        },
        preheater: {
          temperature: 0.0037007729*packet.readUInt16BE(10) + 10.2201522894
        },
        heater: {
          temperature: 0.0037007729*packet.readUInt16BE(12) + 10.2201522894
        },
        sd1: packet.readUInt16BE(14),
        sd2: packet.readUInt16BE(16),
        timestamp: packet.readUInt32BE(18),
        counter: packet.readUInt32BE(22)
      }
      return result
    },
    serialize(buffer, offset, args) {
      return 0;
    }
  }, {
    id: 0x01,
    method: "storeCalibration",
    deserialize(packet) {
      let result = {
        ph: {
          raw: packet.readUInt16BE(0),
        },
        na: {
          raw: packet.readUInt16BE(2),
        },
        cl: {
          raw: packet.readUInt16BE(4),
        },
        k: {
          raw: packet.readUInt16BE(6),
        },
        conductivity: {
          raw: packet.readUInt16BE(8),
        },
        preheater: {
          temperature: 0.0037007729*packet.readUInt16BE(10) + 10.2201522894
        },
        heater: {
          temperature: 0.0037007729*packet.readUInt16BE(12) + 10.2201522894
        }
      }
      return result
    },
    serialize(buffer, offset, args) {
      return 0;
    }
  }
]
