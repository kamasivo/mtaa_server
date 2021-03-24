module.exports = {


  friendlyName: 'View bills',


  description: 'View all bills of user.',


  inputs: {
    userId: {
      description: 'The ID of the user to look up.',
      type: 'number',
      required: false
    }
  },

  exits: {
    success: {
      responseType: 'json',
      description: 'Returning bills that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ userId }) {
    sails.log.info('get bill');
    // `userId` property from this session.
    // this.req.session.userId;

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    var user = await User.findOne({ id: userId }).populate('bills');
    // var user = await User.find().populate('bills');


    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    if (!user) { throw 'notFound'; }

    // Display a personalized welcome view.
    return {
      bills: user.bills
    };

  }


};
