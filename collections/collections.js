Options = new Mongo.Collection("options");
Outputs = new Mongo.Collection("outputs");
Messages = new Mongo.Collection("messages");
SensorsDB = {
  analysis: new Mongo.Collection('analysis',{
    transform(doc) {
      return new Analysis(doc);
    }
  }),
  samplesPerHour: new Mongo.Collection('samples')
}
SensorCollections = {
	ph:new Mongo.Collection("ph"),
	na:new Mongo.Collection("na"),
	k:new Mongo.Collection("k"),
	cl:new Mongo.Collection("cl"),
	lastInsertion(){
		let date = undefined
		for (var property in this) {
      if (this.hasOwnProperty(property)) {
        if(typeof this[property] == 'object'){
					lastSamp = this[property].findOne({},{sort:{date:-1}})
					if(lastSamp){
	          if(!date)
							date = lastSamp.date
						else
	          	date = moment(lastSamp.date).isAfter(date) ? lastSamp.date : date;
					}
        }
      }
    };
		return date;
	},
	samplesFromDate(date){
		let col = [];
		for (var property in SensorCollections) {
			if (SensorCollections.hasOwnProperty(property)) {
				if(typeof SensorCollections[property] == 'object'){
					col.push(SensorCollections[property].find(
						{date:{$gte:date,$lt:moment(date).add(1,'days').toDate()}},
						{sort:{date:-1}}
					))
				}
			}
		};
		return col;
	}
}
//just for test.
Options.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
Messages.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
SensorsDB.samplesPerHour.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
SensorsDB.analysis.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
