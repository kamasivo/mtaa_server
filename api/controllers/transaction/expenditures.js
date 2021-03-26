module.exports = {


  friendlyName: 'View expenditures transaction',


  description: 'View all expenditures transaction of user.',



  exits: {
    success: {
      description: 'Returning expenditures transaction that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function () {
    var userId = this.req.session.userId;
    var user = await User.findOne({ id: userId }).populate('alltransactions', { where: { classification: 'EXP' } });

    if (!user) { throw 'notFound'; }

    return {
      expenditureTransaction: user.alltransactions
    };

  }


};
