module.exports = {


  friendlyName: 'View income category',


  description: 'View all income category of user.',

  exits: {
    success: {
      description: 'Returning income category that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ }) {
    var userId = this.req.session.userId;
    var user = await User.findOne({ id: userId }).populate('incomeTypes');

    if (!user) { throw 'notFound'; }

    return {
      incomeCategories: user.incomeTypes
    };

  }


};
