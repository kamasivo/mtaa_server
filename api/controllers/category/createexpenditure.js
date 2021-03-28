module.exports = {


  friendlyName: 'Create expenditure category',


  description: 'Create new expenditure category for user.',

  inputs: {
    name: {
      type: 'string',
      required: true
    },
    billId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'New category created.',
    },
    notFound: {
      description: 'No bill with the specified ID was found in the database.',
      responseType: 'notFound',
    }
  },

  fn: async function ({ name, billId }) {

    await Category.create({
      name: name,
      expenditureTypes: billId,
    }).then(() => sails.log.info('successfully created'));


    return {
      response: 'created successfully'
    };

  }


};
