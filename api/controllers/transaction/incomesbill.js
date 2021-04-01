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
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ billId }) {
    var bill = await Bill.findOne({ id: billId }).populate('transactions', { where: { classification: 'INC' } });

    if (!bill) { throw 'notFound'; }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }

    return {
      transaction: bill.transactions
    };

  }


};
