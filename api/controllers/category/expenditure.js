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
      description: 'Returning expenditure category that belongs logged in user.'
    },
    notFound: {
      description: 'No bill with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({billId }) {
    var bill = await Bill.findOne({ id: billId }).populate('expenditureTypes');


    if (!bill) { throw 'notFound'; }

    return {
      expenditureCategories: bill.expenditureTypes
    };

  }


};
