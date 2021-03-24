module.exports = {


  friendlyName: 'Delete bill',


  description: 'Delete bill by id.',


  inputs: {
    billId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Bill was successfully deleted.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ billId }) {
    await Bill.destroy({ id: billId });

    return {
      response: 'Bill was deleted'
    };

  }


};
