module.exports = {


  friendlyName: 'View income category',


  description: 'View all income category of user.',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Returning income category that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ userId }) {
    var user = await User.findOne({ id: userId }).populate('transactionTypes', { where: { classification: 'INC' } });

    if (!user) { throw 'notFound'; }

    return {
      incomeCategories: user.transactionTypes
    };

  }


};
