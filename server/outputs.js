OutputsController = {
  "update": function (state) {
    if (Match.test(state, {pin: Match.Integer, value: Match.Integer})) {
      var selector = { pin: state.pin };
      var modifier = { $set: { value: state.value } };
      console.log(modifier);
      Outputs.update(selector, modifier, { upsert: true });
    } else  console.log("update: Invalid Arguments");
  }
}
