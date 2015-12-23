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

/*Data = new Mongo.Collection("data");
Data.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});*/


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
Outputs.allow({
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
