module.exports = {


  friendlyName: 'View incomes transaction',


  description: 'View all incomes transaction of user.',



  exits: {
    success: {
      description: 'Returning incomes transaction that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function () {
    var userId = this.req.session.userId;
    var user = await User.findOne({ id: userId }).populate('alltransactions', { where: { classification: 'INC' } });

    if (!user) { throw 'notFound'; }

    return {
      incomesTransaction: user.alltransactions
    };

  }


};
