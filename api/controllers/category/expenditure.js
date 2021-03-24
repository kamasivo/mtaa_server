module.exports = {


  friendlyName: 'View expanditure category',


  description: 'View all expanditure category of user.',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Returning expenditure category that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ userId }) {
    var user = await User.findOne({ id: userId }).populate('transactionTypes', { where: { classification: 'EXP' } });


    if (!user) { throw 'notFound'; }

    return {
      expenditureCategories: user.transactionTypes
    };

  }


};
