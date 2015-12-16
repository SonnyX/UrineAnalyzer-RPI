let buffer = new Buffer(0)

Buffer.prototype.indexOf = function(value, initial) {
	if (typeof(initial) === 'undefined') initial = 0

	for (var i = initial; i < this.length; i++) {
		if (this[i] == value) return i
	}

	return -1
}

Parser = function parser(emitter, data) {
	buffer = Buffer.concat([buffer, data])

	let startByte = buffer.indexOf(33)
	while (startByte != -1) {
		let payloadSize = buffer.readUInt8(startByte + 1)
		let payloadStart = startByte + 2
		let payloadEnd = payloadStart + payloadSize

		/*
		 *	If payloadEnd is greater then length then the
		 *	packet did not arrived yet, slice the buffer and return
		 */
		if (payloadEnd > buffer.length) {
			buffer = buffer.slice(startByte)
			return
		}

		emitter.emit('data', buffer.slice(payloadStart, payloadEnd))
		startByte = buffer.indexOf(33, payloadEnd)
	}

	/*
	 * If we leave the loop then we consumed the whole buffer
	 */
	buffer = Buffer(0)
}
