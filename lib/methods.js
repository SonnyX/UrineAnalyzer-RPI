Meteor.methods({
  settingsDropdownUpdate(_id, item) {
    Settings.update( { _id }, { $set: { item } } );
  },
  optionsDropdownUpdate(_id, item) {
    Settings.update( { _id }, { $set: { item } } );
  },
  samplingSpinboxUpdate(value) {
    Options.update({ _id: 'SamplingFreq-' + Meteor.userId() }, { $set: { value } });
  },
  toggleServicesRelease(released) {
    Settings.update({ _id: 'Services' }, { $set: { released: !released } })
  },
  cleanSamples() {
    if (!Settings.findOne({ _id: 'Services' }).released)  throw new Meteor.Error(402, "You're not authorized to clean samples");
    Samples.remove({});
    Analysis.remove({});
  },
  VerifiedCreateUser(user) {
    if (!this.isSimulation) {
      user.connection = this.connection;
      return Accounts.createUser(user);
    }
  },
  verifyConnection() {
    if (!this.isSimulation) {
      return this.connection.clientAddress === '127.0.0.1' || (Meteor.user() && Meteor.user()._createdBy === '/')
    }
  },
  isValidRoute(id) {
    if (!this.isSimulation) {
      let aux = false;
      Settings.findOne({ _id: "Data" }).data.map(function (data, i) { if (data._id == id && data.label)  aux = true; })
      if (!aux) throw new Meteor.Error(402, "This is not a valid route");
    }
  },
  verifyLocalHost() {
    if (!Settings.findOne({ _id: 'Services' }).released) throw new Meteor.Error(402, "You're not authorized to do this");
    if (!this.isSimulation) return this.connection.clientAddress === '127.0.0.1'
  },
  execOnServer(command) {
    if (!this.isSimulation) {
      if (this.connection.clientAddress != '127.0.0.1') throw new Meteor.Error(999, "Only possible to do this action on the machine");
      if (!isValidCommand(command)) throw new Meteor.Error(98, 'This is not a valid command')
      let Future = Npm.require('fibers/future');
      let future = new Future()
      Npm.require('child_process').exec(command, function (error, stdout, stderr) {
        if (error) {
          future.throw(new Meteor.Error(99, stderr.toString()));
          return;
        }
        future.return(stdout.toString())
        return;
      });
      return future.wait();
    }
  },
  DbToCSV() {
    let Data = Settings.findOne({ _id: 'Data' }).data;
    let data = [];
    Samples.find({}).map(function (sample, i) {
      let analysis = Analysis.findOne({  _id: sample._id.substring(sample._id.indexOf('#') + 1) })
      let { timeStamp } = sample
      sample.samples.map(function (sample, i) {
        if (i < analysis.counter + 1) {
          let momento = moment(timeStamp).add(i * analysis.frequency, 'milliseconds')
          sample.Date = momento.format('DD/MM/YYYY');
          sample.Time = momento.format('HH:mm:ss');
          data.push(sample);
        }
      })
    })
    return Papa.unparse(data)
  },
  'SamplesOptions.date': function (date) {
    if (moment.isDate() || !isNaN(date)) {
      Options.update({ _id: 'SamplesOptions-' + Meteor.userId() }, { $set: { date } })
      if (this.isSimulation) {
        $('#SamplesOptions-' + Meteor.userId() + '.datetimepicker').data().DateTimePicker.date(date);
      } //update the date in the DateTimePicker
    }
  },
  'messages.show' (message) {
    if (this.isSimulation) {
      console.log(message);
      Messages.insert(message);
    }
  },
  'messages.clear' () {
    if (this.isSimulation) Messages.remove({});
  },
  updatePhBufferDate() {
    let date = moment().startOf('day').toDate()
    Settings.update({ _id: 'PhBuffer' }, { $set: { date: date } });
    if (this.isSimulation) {
      if ($('#PhBuffer' + '.datetimepicker').data()) $('#PhBuffer' + '.datetimepicker').data().DateTimePicker.date(date);
    }
    return 'PhBufferMsg';
  },
  'Settings.ChangeDate' (selector, date) {
    Settings.update(selector, { $set: { date } });
  },
  'Options.ChangeDate' (selector, date) {
    Options.update(selector, { $set: { date } });
  },
  toggleOutput(output) {
    Outputs.update({ _id: output._id }, { $set: { active: !output.active } });
  },
  startSampling() {
    if (!Settings.findOne({ _id: 'Services' }).released) throw new Meteor.Error(402, "You're not authorized to Start sampling");
    AnalysisController.removeEmpty();
    let { value, item } = Options.findOne({ _id: 'SamplingFreq-' + Meteor.userId() })
    let frequency = item == 'minute(s)' ? value * 60 : value;
    if (!this.isSimulation) {
      if (!Services.isConnected()) throw new Meteor.Error(666, "MSP not connected");
      AnalysisController.insert(+moment(), { value: (frequency * 1000) });
      Services.call('resetCounter', {}, Meteor.bindEnvironment(function (status) {
        if (status == 'success') {
          let counter = 0
          Meteor.call('sampleOnce');
          HANDLE = Meteor.setInterval(function () {
            if (Services.isConnected()) {
              Meteor.call('sampleOnce', ++counter);
            }
          }, frequency * 1000);
        } else throw new Meteor.Error(402, "Failed to reset counter");
      }))
    }
  },
  stopSampling() {
    if (!Settings.findOne({ _id: 'Services' }).released) throw new Meteor.Error(402, "You're not authorized to stop sampling");
    AnalysisController.removeEmpty();
    if (!this.isSimulation) {
      Meteor.clearInterval(HANDLE);
      Settings.update({ _id: 'SamplingState' }, { $set: { value: false } });
    }
  },
  configureLocks({  _id, id, value }) {
    if (!Settings.findOne({ _id: 'Services' }).released) throw new Meteor.Error(402, "You're not authorized to configure locks");
    if (!this.isSimulation) {
      if (!Services.isConnected()) throw new Meteor.Error(666, "MSP not connected");
      Services.call('configureLocks', [{ id, value }], Meteor.bindEnvironment(function (status, result) {
        if (status == 'success') {
          Outputs.update({ _id }, { $set: { value } });
        } else throw new Meteor.Error(402, "Failed to configure lock");
      }))
    }
  },
  updateServices() {
    if (!this.isSimulation) {
      if (!Settings.findOne({ _id: 'Services' }).released) throw new Meteor.Error(402, "You're not authorized to update Services");
      Settings.update({ _id: 'Services' }, { $set: { isBusy: false } });
    }
  },
  'Outputs.update': function (_id, id, value) {
    Outputs.update({ 'outputs._id': _id }, { $set: { 'outputs.$.start': value } });
  },
  configureOutputs(_id, id, value) {
    let services = Settings.findOne({ _id: 'Services' })
    if (!services.released) throw new Meteor.Error(402, "You're not authorized to configure" + Outputs.findOne({'outputs._id':_id})._id );
    if (!this.isSimulation) {
      if (!Services.isConnected()) throw new Meteor.Error(666, "MSP not connected");
      Settings.update({ _id: 'Services'  }, { $set: { isBusy: true } });
      let Future = Npm.require('fibers/future');
      let future = new Future()
      Services.call( "configure"+ Outputs.findOne({'outputs._id':_id})._id , [{ id, value }],
        Meteor.bindEnvironment(function (status, result) {
          if (status == 'success') {
            Outputs.update({ 'outputs._id': _id }, { $set: { 'outputs.$.start': value } });
            future['return']('success');
          } else future.throw(new Meteor.Error(402, "Cannot change value in automatic mode"))
        }))
      return future.wait();
    }
  }
});

if (Meteor.isServer) {
  Meteor.methods({
    createAdmin() {
      if (!Meteor.users.find({}).count()) Accounts.createUser({ username: 'admin', password: 'admin', connection: { clientAddress: '127.0.0.1' }, })
    },
    getTemperatures() {
      Meteor.setInterval(function () {
        if (Services.isConnected()) {
          Services.call('sampleOnce', {}, Meteor.bindEnvironment(function (status, data) {
            if (status == 'success') {
              if (typeof data.result == "undefined") new Meteor.Error(402, "Unable to get temperature")
              if (typeof data.result.preheater == "undefined") new Meteor.Error(402, "Unable to get temperature")
              let temperatures = {
                preheater: data.result.preheater.temperature.toFixed(1),
                heater: data.result.heater.temperature.toFixed(1)
              }
              Settings.update({ _id: 'TopMenuItems', 'rightItems.template': 'MenuTemp' }, { $set: { 'rightItems.$.data.temperature': temperatures } });
            } else throw new Meteor.Error(402, "Failed to get temperature (sampleOnce)");
          }))
        } else Settings.update({ _id: 'TopMenuItems', 'rightItems.template': 'MenuTemp' }, { $set: { 'rightItems.$.data.temperature': { preheater: '--', heater: '--' } } });
      }, 1000)
    },
    sampleOnce(counter = 0) {
      Services.call('sampleOnce', {}, Meteor.bindEnvironment(function (status, data) {
        if (status == 'success') {
          Settings.update({ _id: 'SamplingState' }, { $set: { value: true } });
          let { ph, na, k, cl, conductivity, heater } = data.result;
          let sample = {
            ph: parseFloat(((ph.raw / 16384.0 - 0.5) * 10).toFixed(3)),
            na: parseFloat(((na.raw / 16384.0 - 0.5) * 10).toFixed(3)),
            k: parseFloat(((k.raw / 16384.0 - 0.5) * 10).toFixed(3)),
            cl: parseFloat(((cl.raw / 16384.0 - 0.5) * 10).toFixed(3)),
            conductivity: parseFloat(((conductivity.raw / 16384.0 - 0.5) * 10).toFixed(3)),
            heater: parseFloat((heater.temperature).toFixed(2)),
            volume: 0,
          }
          AnalysisController.dataReceived({ data: sample, date: +moment(), counter })
          return;
        } else if (status == 'busy') {
          future.throw(new Meteor.Error(402, "MSP is currently busy with another request"))
          return;
        } else {
          future.throw(new Meteor.Error(402, "Function SampleOnce failed"))
          return;
        }
      }))
    }
  });
}
