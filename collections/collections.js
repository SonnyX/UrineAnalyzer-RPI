Options = new Mongo.Collection("options");
Outputs = new Mongo.Collection("outputs");
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
					propDate = this[property].findOne({},{sort:{date:-1}}).date
          if(!date)
						date = propDate
					else
          	date = moment(propDate).isAfter(date) ? propDate : date;
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
