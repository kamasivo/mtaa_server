module.exports = {


  friendlyName: 'Create income category',


  description: 'Create new income category for user.',

  inputs: {
    name: {
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {
      description: 'New category created.',
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound',
    }
  },

  fn: async function ({ name }) {
    var userId = this.req.session.userId;
    await Category.create({
      name: name,
      incomeTypes: userId,
    }).then(() => sails.log.info('successfully created'));


    return {
      response: 'created successfully'
    };

  }


};
