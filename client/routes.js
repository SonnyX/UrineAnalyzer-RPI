BlazeLayout.setRoot('body');

let mainRoutes = FlowRouter.group({
  prefix:'',
  name:'mainRoute',
  triggersEnter:[function(context,redirect,stop){
    Meteor.call('verifyConnection',function(error,isRoot){
      if(error)throw error;
      Session.set("_root", isRoot);
      if(!isRoot && !Meteor.userId()){
        //redirect('/entry?active=login')
        FlowRouter.go(FlowRouter.path("Entry",{},{active:'login'}));
        stop();
      }
    })
  }]
})

mainRoutes.route('/', {
  name:'Main',
  action: function(params,queryParams) {
    BlazeLayout.render('Main', { content: 'Overview'});
  }
});

mainRoutes.route('/data/:id', {
  action: function(params,queryParams) {
    Meteor.call('isValidRoute',params.id,function(error,result){
      if(error){
        Messages.newErrorMsg(error);
        FlowRouter.go(FlowRouter.path("Main"));
        return;
      }
    })
    BlazeLayout.render('Main', { content:'Data'});
  }
});

mainRoutes.route('/outputs', {
  name:'Outputs',
  action: function(params,queryParams) {
    BlazeLayout.render('Main', { content: 'Outputs'});
  }
});

mainRoutes.route('/settings', {
  action: function(params) {
    BlazeLayout.render('Main', { content:'Settings'});
  }
});

let entryRoutes = FlowRouter.group({
  prefix:'/entry',
  name:'entryRoute',
  triggersEnter:[function(context,redirect,stop){
    Messages.remove({});
  }]
})

entryRoutes.route('/',{
  name:'Entry',
  action:function(params,queryParams){
    BlazeLayout.render('VerticallyCenterAligned', { content:'Entry'});
  }
})

entryRoutes.route('/reset-password/:token',{
  name:'reset-password',
  action:function(params,queryParams){
    BlazeLayout.render('VerticallyCenterAligned', { content:'Reset', token:params.token});
  }
})

FlowRouter.notFound = {
    action: function(param,queryParams) {
      console.error('Route not found');
      FlowRouter.go('Entry');
    }
};
