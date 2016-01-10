Analysis = new Mongo.Collection('analysis',{
  transform(doc) {
    return new AnalysisClass(doc);
  }
});
Messages = new MessagesCollection(null);
Options = new Mongo.Collection("options");
Outputs = new Mongo.Collection("outputs");
Samples = new Mongo.Collection('samples');
Settings = new Mongo.Collection('settings');

Settings.allow({
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

Samples.allow({
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

Analysis.allow({
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
