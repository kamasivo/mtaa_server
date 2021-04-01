module.exports = {


  friendlyName: 'Create income category',


  description: 'Create new income category for user.',

  inputs: {
    sum: {
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
    }
  },

  fn: async function ({ sum, categoryId }) {
    var classification = 'INC';
    var userId = this.req.session.userId;

    var category = await Category.findOne({ id: categoryId });
    if (!category) { throw 'notFound'; }

    if (category.incomeTypes !== userId) {
      throw 'notPermitted';
    }


    var user = await User.findOne({ id: userId }).populate('bills');
    if (!user) { throw 'notFound'; }

    let bills = user.bills;
    for (const bill of bills) {
      await Transaction.create({              // create transaction in every bill
        sum: sum * bill.incomePercents / 100,
        classification: classification,
        belongs: bill.id,
        user: userId,
        category: categoryId
      });

      await Bill.update({ id: bill.id })     // add money on bill
        .set({
          sum: bill.sum + sum * bill.incomePercents / 100,
        });
    }
  }


};
