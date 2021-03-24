module.exports = {


  friendlyName: 'View bills',


  description: 'View all bills of user.',

  exits: {
    success: {
      responseType: 'view',
      description: 'Returning bills that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function () {
    // userId, name, incomePercents, description, sum 
    sails.log.info('post starting');
    // req.param('name');
    // `userId` property from this session.
    // this.req.session.userId;

    // Look up the user whose ID was specified in the request.
    // Note that we don't have to validate that `userId` is a number;
    // the machine runner does this for us and returns `badRequest`
    // if validation fails.
    // var user = await User.find().populate('bills');

    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    // if (!user) { throw 'notFound'; }

    await Bill.create({
      name: name,
      incomePercents: incomePercents,
      description: description,
      sum: sum,
      userOwner: userId
    }).then(() => sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)'));


    return {
      // bills: user.bills
    };

  }


};
