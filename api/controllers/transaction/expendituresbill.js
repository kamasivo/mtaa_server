module.exports = {


  friendlyName: 'View expenditures transaction',


  description: 'View all expenditures transaction of user.',


  inputs: {
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

  fn: async function ({ billId }) {
    var bill = await Bill.findOne({ id: billId }).populate('transactions', { where: { classification: 'EXP' } });

    if (!bill) { throw 'notFound'; }

    return {
      expenditureTransaction: bill.transactions
    };

  }


};
