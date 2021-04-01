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
    notOwner: {
      description: 'You are not owner of this record.',
      responseType: 'notpermitted'
    },
    badName: {
      description: 'You cant delete Default bill.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ billId }) {
    let user = await User.findOne({ id: this.req.session.userId }).populate('bills', { where: { name: 'Default' } });
    if (!user) { throw 'notFound'; }
    let defaultBill = user.bills[0];

    var bill = await Bill.findOne({ id: billId });
    if (!bill) { throw 'notFound'; }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notOwner';
    }
    if (bill.name === 'Default') {
      throw 'badName';
    }

    await Bill.update({ id: defaultBill.id })   // set new percents in default bill
      .set({
        incomePercents: defaultBill.incomePercents + bill.incomePercents,
      });


    await Bill.destroy({ id: billId });
    return {
      response: 'Bill was deleted'
    };

  }


};
