MessagesCollection = class Messages extends Mongo.Collection {
  constructor(name){
    super(name)
  }
  insert(doc,callback){
		doc.createdAt = new Date();
    return super.insert(doc,callback);
  }
  update(selector,modifier,options,callback){
    return super.update(selector,modifier,options,callback);
  }
  remove(selector,callback){
    return super.remove(selector,callback);
  }
	newErrorMsg(error){
		super.upsert(
			{_id:error.error.toString()},
			{
				$set:{
					msg:error.reason,
					options:{
						closeBtn:true,
						type:'error',
						fade:4000
					},
					createdAt:new Date()
				}
			},
			{},
			function(e){return}
		)
	}
}
