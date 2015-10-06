// Check serial connection every 5s
Meteor.startup(function () {
  Meteor.setInterval(function () {
    Serial.watchdog();
  }, 10000);
});

Meteor.methods({
  "changeOutput": function (pin, value) {
    var array = [0, pin, value];
    Serial.write(JSON.stringify(array));
  }
});