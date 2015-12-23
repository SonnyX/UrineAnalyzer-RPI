let backup = Npm.require('mongodb-backup');
var restore = Npm.require('mongodb-restore');
var fs = Npm.require('fs');

WebApp.connectHandlers.use('/backup',function(req,res,next){
  if(req.method ==='GET'){
    res.writeHead(200, { 'Content-Type': 'application/x-tar' });
    backup({
      uri: 'mongodb://localhost:3001/meteor',
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

WebApp.connectHandlers.use('/restore',function(req,res,next){
  if(req.method ==='POST'){
    let file = fs.createWriteStream('/home/sunderhus/Desktop/dump/dump.tar');
    file.on('error',function(error){
      console.log('errr: ' + error);
    });
    file.on('finish',Meteor.bindEnvironment(function(){
      res.writeHead(204);
      res.end(); //end the respone
      restore({
        uri: 'mongodb://localhost:3001/meteor',
        root:'/home/sunderhus/Desktop/dump/',
        tar:'dump.tar',
        drop:true,
        callback:Meteor.bindEnvironment(function(err){
          fs.unlink('/home/sunderhus/Desktop/dump/dump.tar',Meteor.bindEnvironment(function (err){
            if (err) throw err;
            Meteor.call('messages.show','DbRestorationMsg')
          }));
        })
      })
    }));
    req.pipe(file); //pipe the request to the file
  }
})
