module.exports = {


  friendlyName: 'Create income category',


  description: 'Create new income category for user.',

  inputs: {
    sum: {
      type: 'number',
      required: true
    },
    billId: {
      type: 'number',
      required: true
    },
    categoryId: {
      type: 'number',
      required: true
    },
  },

  exits: {
    success: {
      description: 'New transaction created.',
      responseType: 'created'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound',
    }
  },

  fn: async function ({ sum, billId, categoryId }) {
    var classification = 'INC';
    var userId = this.req.session.userId;

    var bill = await Bill.findOne({ id: billId });
    if (!bill) { throw 'notFound'; }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }


    await Transaction.create({
      sum: sum,
      classification: classification,
      belongs: billId,
      user: userId,
      category: categoryId
    }).then(() => sails.log.info('successfully created'));
  }


};
