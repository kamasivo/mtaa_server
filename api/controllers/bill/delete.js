module.exports = {


  friendlyName: 'Delete bill',


  description: 'Delete bill by id.',


  inputs: {
    billId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Bill was successfully deleted.'
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
    var bill = await Bill.findOne({ id: billId });
    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }

    await Bill.destroy({ id: billId });
    return {
      response: 'Bill was deleted'
    };

  }


};
