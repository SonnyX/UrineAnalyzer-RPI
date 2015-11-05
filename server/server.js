// Check serial connection every 5s
Meteor.startup(function () {
  /*Meteor.setInterval(function () {
    Serial.watchdog();
  }, 10000);*/
  Meteor.call('verifyOptions');
});

//Do not delete!!!
/*[
  { _id: 'NyxkYYqQMJ7qYCYmR', pin: 8, value: 0 },
  { _id: 'T4o9bBKrXrKz5yzhH', pin: 13, value: 0 },
  { _id: 'M4qZNwtCDoMDyN8Zr', pin: 12, value: 255 },
  { _id: 'xrAgNShxYhHM2WTcp', pin: 11, value: 0 }
]*/
