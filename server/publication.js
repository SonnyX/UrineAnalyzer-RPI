
	Meteor.publish("options", function (argument) {
		return Options.find({});
	});
	Meteor.publish("outputs", function (argument) {
		return Outputs.find({});
	});
	Meteor.publish("sensor", function({sensor,item,date}){
		if(!date){
			date = SensorCollections[sensor].findOne({},{sort:{date:-1},limit:item}).date;
		}
		if(item == "All")
		item = undefined;
		let dayAfter = moment(date).add(1,'days').toDate();
		let col = SensorCollections[sensor].find(
			{date:{$gte:date,$lt:dayAfter}},
			{sort:{date:-1},limit:item}
		)
		return col;
	});
