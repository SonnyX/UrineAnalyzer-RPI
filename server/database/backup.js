let backup = Npm.require('mongodb-backup');

WebApp.connectHandlers.use('/database/backup',function(req,res,next){
  if(req.method ==='GET'){
    res.writeHead(200, { 'Content-Type': 'application/x-tar' });
    backup({
      uri: process.env.MONGO_URL || 'mongodb://localhost:3001/meteor',
      stream:res
    })
  } else next();
})
