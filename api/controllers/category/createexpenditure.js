module.exports = {


  friendlyName: 'Create expenditure category',


  description: 'Create new expenditure category for user.',

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

    var classification = 'EXP';
    await Category.create({
      name: name,
      allTypes: userId,
      classification: classification
    }).then(() => sails.log.info('successfully created'));


    return {
      response: 'created successfully'
    };

  }


};
