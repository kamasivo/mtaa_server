module.exports = {


  friendlyName: 'View expanditure category',


  description: 'View all expanditure category of user.',

  inputs: {
    billId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Returning expenditure category that belongs logged in user, given by bill id.'
    },
    notFound: {
      description: 'No bill with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ billId }) {
    var bill = await Bill.findOne({ id: billId }).populate('expenditureTypes');

    if (!bill) { throw 'notFound'; }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }


    return {
      expenditureCategories: bill.expenditureTypes
    };

  }


};
