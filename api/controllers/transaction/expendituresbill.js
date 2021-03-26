module.exports = {


    friendlyName: 'View expenditures transaction',
  
  
    description: 'View all expenditures transaction of user.',
  
  
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
        description: 'Returning expenditures transaction that belongs logged in user.'
      },
      notFound: {
        description: 'No user with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function ({ userId, billId }) {
      var user = await User.findOne({ id: userId }).Bill.findOne({ id: billId }).populate('transactionTypes', { where: { classification: 'EXP' } });
  
      if (!user) { throw 'notFound'; }
  
      return {
        expenditureTransaction: user.bill.transactionTypes
      };
  
    }
  
  
  };
  