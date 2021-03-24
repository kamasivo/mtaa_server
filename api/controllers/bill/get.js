module.exports = {


  friendlyName: 'View bills',


  description: 'View all bills of user.',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Returning bills that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ userId }) {
    // sails.log.info(userId);
    // `userId` property from this session.
    // this.req.session.userId;

    var user = await User.findOne({ id: userId }).populate('bills');

    if (!user) { throw 'notFound'; }

    return {
      bills: user.bills
    };

  }


};
