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
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ transactionId }) {
    var transaction = await Transaction.findOne({ id: transactionId });

    if (!transaction) { throw 'notFound'; }
    if (transaction.user !== this.req.session.userId) {
      throw 'notPermitted';
    }

    await Transaction.destroy({ id: transactionId });

    return {
      response: 'Transaction was deleted'
    };

  }


};
