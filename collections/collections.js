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
