module.exports = {


  friendlyName: 'Edit bill',


  description: 'Edit bill by id.',


  inputs: {
    billId: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string',
      required: false
    },
    incomePercents: {
      type: 'number',
      required: false
    },
    description: {
      type: 'string',
      required: false,
    },
    sum: {
      type: 'number',
      required: false,
    }
  },

  exits: {
    success: {
      description: 'Bill was successfully updated.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    },
    badAction: {
      description: 'Some user is trying to create another Default bill, probably something went wrong with him.',
      responseType: 'badinput',
    },
    incorrectPercents: {
      description: 'User is trying to get more then 100% in total.',
      responseType: 'badinput',
    }
  },

  fn: async function ({ billId, name, incomePercents, description, sum }) {

    var bill = await Bill.findOne({ id: billId });

    if (!bill) { throw 'notFound'; }

    if (bill.name === 'Default') {
      throw 'badAction';
    }

    if (bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }

    let user = await User.findOne({ id: this.req.session.userId }).populate('bills', { where: { name: 'Default' } });
    if (!user) { throw 'notFound'; }

    let defaultBill = user.bills[0];

    if (defaultBill.incomePercents + bill.incomePercents < incomePercents) {    // check if percents are correct
      throw 'incorrectPercents';
    }
    let newPercents = defaultBill.incomePercents - incomePercents + bill.incomePercents;
    if (bill.incomePercents > incomePercents) {
      newPercents = defaultBill.incomePercents + incomePercents;
    }

    await Bill.update({ id: defaultBill.id })   // set new percents in default bill
      .set({
        incomePercents: newPercents
      });


    await Bill.update({ id: billId })
      .set({
        name: name,
        incomePercents: incomePercents,
        description: description,
        sum: sum
      });
  }
};
