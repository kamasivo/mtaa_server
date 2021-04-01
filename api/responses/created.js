module.exports = function created() {

  var res = this.res;

  sails.log.verbose('Record successfully created.');

  return res.sendStatus(201);

};
