const Category = require('../../models/Transaction');

module.exports = {


  friendlyName: 'Delete transaction',


  description: 'Delete transaction by id.',


  inputs: {
    transactionId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'transaction was successfully deleted.'
    },
    notFound: {
      description: 'No transaction with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ transactionId }) {
    await Transaction.destroy({ id: transactionId });
  
    return {
      response: 'Transaction was deleted'
    };

  }


};
