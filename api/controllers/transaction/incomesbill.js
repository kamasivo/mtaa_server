module.exports = {


    friendlyName: 'View incomes transaction',
  
  
    description: 'View all incomes transaction of user.',
  
  
    inputs: {
      billId: {
        type: 'number',
        required: true
      },
    },
  
    exits: {
      success: {
        description: 'Returning incomes transaction that belongs logged in user.'
      },
      notFound: {
        description: 'No user with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function ({ userId }) {
      var user = await Bill.findOne({ id: billId }).populate('transactionTypes', { where: { classification: 'INC' } });
  
      if (!user) { throw 'notFound'; }
  
      return {
        transaction: bill.transactionTypes
      };
  
    }
  
  
  };
  