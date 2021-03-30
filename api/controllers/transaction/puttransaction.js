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
      billId: {
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
  
    fn: async function ({ transactionId, sum, billId, categoryId}) {
      sails.log.info(transactionId)
      var transaction = await Transaction.find({ id: transactionId });
  
      if (!transaction) { throw 'notFound'; }
  
      await Transaction.update({ id: transactionId })
        .set({
            sum: sum,
            belongs: billId,
            category: categoryId
        }).then(() => sails.log.info('successfuly edited'));
  
      return {
        transaction
      };
  
    }
  
  
  };
  