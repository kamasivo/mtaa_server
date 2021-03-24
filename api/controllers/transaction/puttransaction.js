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
      account_id: {
        type: 'number',
        required: false
      },
      category_id: {
        type: 'string',
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
  
    fn: async function ({ transactionId, sum, account_id, category_id}) {
      var transaction = await Bill.findOne({ id: transaction });
  
      if (!transaction) { throw 'notFound'; }
  
      await Transaction.update({ id: billId })
        .set({
            sum: sum,
            clasification: type,
            belongs: account_id,
            category: category_id
        }).then(() => sails.log.info('successfuly edited'));
  
      return {
        transaction
      };
  
    }
  
  
  };
  