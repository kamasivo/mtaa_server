module.exports = {


  friendlyName: 'View bill',


  description: 'View bills by id.',


  inputs: {
    billId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'Returning bills that belongs logged in user.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ billId }) {
    var bill = await Bill.findOne({ id: billId });

    if (!bill) { throw 'notFound'; }

    return {
      bill
    };

  }


};
