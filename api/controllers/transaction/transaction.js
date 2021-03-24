module.exports = {


  friendlyName: 'View transaction',


  description: 'View transaction by id.',


  inputs: {
    transactionId: {
      type: 'number',
      required: true
    },
    userId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Returning transaction.'
    },
    notFound: {
      description: 'No transaction with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ transactionId, userId }) {
    var transaction = await Transaction.findOne({ id: transactionId });

    if (!transaction) { throw 'notFound'; }

    return {
      transaction
    };

  }


};
