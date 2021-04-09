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
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    },
    wrongCategory: {
      description: 'You entered wrong catagory.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ sum, billId, categoryId }) {
    var classification = 'EXP';
    var userId = this.req.session.userId;

    var bill = await Bill.findOne({ id: billId });
    if (!bill) { throw 'notFound'; }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }


    var category = await Category.findOne({ id: categoryId });
    if (!category) { throw 'notFound'; }

    //todo fix this
    // if (category.belongs !== bill.id) {
    //   throw 'wrongCategory';
    // }

    await Transaction.create({
      sum: sum,
      classification: classification,
      belongs: billId,
      user: userId,
      category: categoryId
    });

    await Bill.update({ id: billId })     // add money on bill
      .set({
        sum: bill.sum - sum
      });

  }


};
