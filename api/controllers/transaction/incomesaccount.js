module.exports = {


    friendlyName: 'View incomes transaction',
  
  
    description: 'View all incomes transaction of user.',
  
  
    inputs: {
      userId: {
        type: 'number',
        required: true
      },
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
      var user = await User.findOne({ id: userId }).Bill.findOne({ id: billId }).populate('transactionTypes', { where: { classification: 'INC' } });
  
      if (!user) { throw 'notFound'; }
  
      return {
        incomesTransaction: user.bill.transactionTypes
      };
  
    }
  
  
  };
  