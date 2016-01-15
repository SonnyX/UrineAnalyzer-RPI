let serialport = Npm.require("serialport")
let SerialPort = serialport.SerialPort

let buffer = new Buffer(0)

Buffer.prototype.indexOf = function(value, offset) {
  if (typeof(offset) === 'undefined') offset = 0

  for (var i = offset; i < this.length; i++) {
    if (this[i] == value) return i
  }

  return -1
}

function parser(emitter, data) {
  buffer = Buffer.concat([buffer, data])

  let startByte = buffer.indexOf(0x21)
  while (startByte != -1) {
    let payloadSize = buffer.readUInt8(startByte + 1)
    let payloadStart = startByte + 2
    let payloadEnd = payloadStart + payloadSize

    /*
     *  If payloadEnd is greater then length then the
     *  packet did not arrived yet, slice the buffer and return
     */
    if (payloadEnd > buffer.length) {
      buffer = buffer.slice(startByte)
      return
    }

    emitter.emit('data', buffer.slice(payloadStart, payloadEnd))
    startByte = buffer.indexOf(0x21, payloadEnd)
  }

  /*
   * If we leave the loop then we consumed the whole buffer
   */
  buffer = Buffer(0)
}

Serial = class Serial {

  constructor(onOpen) {
    this.onOpen = onOpen
    this.port = 'undefined'
    this.baudrate = 115200
    this.connect();
  }

  connect(callback) {
    let self = this

    serialport.list(function (error, ports) {
      if (typeof(ports) !== 'undefined') {

        /*ports = ports.filter(function (port) {
          return (port.pnpId.indexOf('Texas_Instruments') != -1)
        })*/
        ports = ports.filter(function (port) {
          return (port.manufacturer == 'Texas_Instruments')
        })

        if (ports.length !== 0) {
          console.log('>> Serial: MSP432 found')
          self.port = ports[0].comName
          self.serialHandle = new SerialPort(self.port, {
            baudrate: self.baudrate,
            parser: parser
          },false)
          self.open(callback);
          return;
        }
      }
      self.port = 'undefined'
      console.log('>> Serial: Unable to find MSP432!')
      if(callback){callback(false);}
    })
  }

  reconnect(){
    let self = this;
    this.connect(function(result){
      if(!result){
        return;
      }
      if(!self.serialHandle.isOpen()){
        self.reconnect();
      }
    })
  }

  open(callback) {
    let self = this
    this.serialHandle.open(function (error) {
      if (error) {
        console.log(`>> Serial: could not open serial port: ${error}`)
      }
      else {
        console.log(`>> Serial: ${self.port} connection successful`)
        self.onOpen()
      }
      if(callback){callback(true);}
    })
  }

  on(type, callback) {
    this.serialHandle.on(type, callback)
  }

  write(data) {
    try {
      this._serialHandler().write(data)
    } catch (error) {
      if(error.error == 399){
        throw error
      }
      this.reconnect();
      throw new Meteor.Error(398,'Unable to find MSP432, trying to reconnect');
    }
  }

  _serialHandler(){
    if(this.serialHandle){
      return this.serialHandle;
    }
    throw new Meteor.Error(399, "Unable to find MSP432");
  }
}
