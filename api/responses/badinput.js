module.exports = function badinput() {

  var res = this.res;

  sails.log.verbose('You entered invalid input, try something else.');

  return res.sendStatus(405);

};
