module.exports = {


  friendlyName: 'View users',


  description: 'View all users.',

  exits: {
    success: {
      description: 'Returning all users.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function () {
    var user = await User.find();

    if (!user) { throw 'notFound'; }

    return {
      user: user
    };

  }


};
