let backup = Npm.require('mongodb-backup');

WebApp.connectHandlers.use('/database/backup',function(req,res,next){
  if(req.method ==='GET'){
    res.writeHead(200, { 'Content-Type': 'application/x-tar' });
    backup({
      uri: process.env.MONGO_URL || 'mongodb://localhost:3001/meteor',
      // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
      //root: '/home/sunderhus/Desktop/Dump',
      stream:res,
      tar:'backup.tar',
      callback:function(){
        res.end();
      }
    })
  }
  //next()
})
