module.exports = {


  friendlyName: 'Delete bill',


  description: 'Edit bill by id.',


  inputs: {
    billId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Bill was successfully updated.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ billId }) {
    await Bill.destroy({ id: billId });

    return {
      response: 'bill was deleted'
    };

  }


};
