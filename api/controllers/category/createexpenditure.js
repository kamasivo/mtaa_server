module.exports = {


  friendlyName: 'Create expenditure category',


  description: 'Create new expenditure category for user.',

  inputs: {
    userId: {
      type: 'number',
      required: true
    },
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

  fn: async function ({ userId, name }) {
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
