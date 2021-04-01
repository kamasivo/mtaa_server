module.exports = function notpermitted() {

  var res = this.res;

  sails.log.verbose('Not permitted action.');

  return res.sendStatus(403);

};
