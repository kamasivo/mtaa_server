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

  fn: async function ({ billId }) {
    var bill = await Bill.findOne({ id: billId }).populate('transactions', { where: { classification: 'INC' } });

    if (!bill) { throw 'notFound'; }

    return {
      transaction: bill.transactions
    };

  }


};
