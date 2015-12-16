let serialport = Npm.require("serialport")
let SerialPort = serialport.SerialPort

Serial = class Serial {
	constructor(onOpen) {
		this.onOpen = onOpen
		this.port = 'undefined'
		this.baudrate = 115200
		this.connect()
	}

	connect() {
		let self = this

		serialport.list(function (error, ports) {
			if (typeof(ports) !== 'undefined') {
				ports = ports.filter(function (port) {
					return (port.pnpId.indexOf('Texas_Instruments') !== -1)
				})

				if (ports.length !== 0) {
					console.log('#Serial: MSP432 found')
					self.port = ports[0].comName
					self.serialHandle = new SerialPort(self.port, {
		 				baudrate: self.baudrate,
		 				parser: Parser
					})

					self.open()
					return;
				}
			}
			self.port = 'undefined'
			console.log('#Serial: Unable to find MSP432!')
		})
	}

	open() {
		let self = this
		this.serialHandle.open(function (error) {
			if (error) {
				console.log(`#Serial: could not open serial port: ${error}`)
			}
			else {
				console.log(`#Serial: ${self.port} connection successful`)
				self.onOpen()
			}
		})
	}

	on(type, callback) {
		this.serialHandle.on(type, callback)
	}

	write(data) {
		this.serialHandle.write(data)
	}
}
