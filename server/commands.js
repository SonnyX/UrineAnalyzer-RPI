COMMANDS = ['bundle/cal_ts.sh']

isValidCommand = function(command){
  if(COMMANDS.indexOf(command) == -1)
    return false;
  return true
}
