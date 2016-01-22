WebApp.connectHandlers.use('/database/samples/csv',function(req,res,next){
  if(req.method ==='GET'){
    res.writeHead(200, { 'Content-Type': 'text/csv' });
    Meteor.call('DbToCSV',Meteor.bindEnvironment(function(error,result){
      if(error) throw error;
      res.write(result)
    }))
    res.end()
  }
})
