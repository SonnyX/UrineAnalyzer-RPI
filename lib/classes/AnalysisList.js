class AnalysisList extends Mongo.Collection {
  constructor(name){
    super(name)
  }
  insert(doc,callback){
    let {frequency,date} = doc || {};

    return super.insert(doc,callback);
  }
  update(selector,modifier,options,callback){
    return super.update(selector,modifier,options,callback);
  }
  remove(selector,callback){
    return super.remove(selector,callback);
  }

}
