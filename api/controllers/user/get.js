module.exports = {


  friendlyName: 'View users',


  description: 'View all users.',


  inputs: {
  },

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


    // If no user was found, respond "notFound" (like calling `res.notFound()`)
    if (!user) { throw 'notFound'; }

    // Display a personalized welcome view.
    return {
      user: user
    };

  }


};
