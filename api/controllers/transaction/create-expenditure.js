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
    var classification = 'EXP';
    var userId = this.req.session.userId;
    await Transaction.create({
      sum: sum,
      classification: classification,
      belongs: billId,
      user: userId,
      category: categoryId
    });

    var bill = await Bill.findOne({ id: billId });
    await Bill.update({ id: billId })     // add money on bill
      .set({
        sum: bill.sum - sum
      });

  }


};