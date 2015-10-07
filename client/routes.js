BlazeLayout.setRoot('body');

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Panel',innerContent:'Sensor' });
  }
});

FlowRouter.route('/outputs', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Panel',innerContent:'Outputs' });
  }
});

FlowRouter.route('/data/ph', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Data',innerContent:'pH' });
  }
});

FlowRouter.route('/data/na', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Data',innerContent:'Na' });
  }
});

FlowRouter.route('/data/k', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Data',innerContent:'K' });
  }
});

FlowRouter.route('/data/cl', {
  action: function() {
    BlazeLayout.render('Main', { content: 'Data',innerContent:'Cl' });
  }
});
