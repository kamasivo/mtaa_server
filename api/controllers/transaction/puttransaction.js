const Transaction = require("../../models/Transaction");

module.exports = {


    friendlyName: 'Edit transaction',
  
  
    description: 'Edit transaction by id.',
  
  
    inputs: {
      transactionId: {
        type: 'number',
        required: true
      },
      sum: {
        type: 'number',
        required: false
      },
      accountId: {
        type: 'number',
        required: false
      },
      categoryId: {
        type: 'number',
        required: false,
      },
    },
  
    exits: {
      success: {
        description: 'Transaction was successfully updated.'
      },
      notFound: {
        description: 'No transaction with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function ({ transactionId, sum, accountId, categoryId}) {
      var transaction = await Transaction.findOne({ id: transactionId });
  
      if (!transaction) { throw 'notFound'; }
  
      await Transaction.update({ id: transactionId })
        .set({
            sum: sum,
            belongs: accountId,
            category: categoryId
        }).then(() => sails.log.info('successfuly edited'));
  
      return {
        transaction
      };
  
    }
  
  
  };
  