module.exports = {


  friendlyName: 'Create expenditure category',


  description: 'Create new expenditure category for user.',

  inputs: {
    name: {
      type: 'string',
      required: true
    },
    billId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'New category created.',
      responseType: 'created'
    },
    notFound: {
      description: 'No bill with the specified ID was found in the database.',
      responseType: 'notFound',
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ name, billId }) {

    var bill = await Bill.findOne({ id: billId });

    if (!bill) { throw 'notFound'; }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }

    await Category.create({
      name: name,
      expenditureTypes: billId,
    });
  }


};
