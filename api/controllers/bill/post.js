module.exports = {


  friendlyName: 'Create bills',


  description: 'Create new bill for user.',

  inputs: {
    name: {
      type: 'string',
      required: true
    },
    incomePercents: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string',
      required: false,
    },
    sum: {
      type: 'number',
      required: false,
    },
  },

  exits: {
    success: {
      description: 'New bill created.',
      responseType: 'created'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound',
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

  fn: async function ({ name, incomePercents, description, sum }) {
    if (name === 'Default') {
      throw 'badAction';
    }

    let user = await User.findOne({ id: this.req.session.userId }).populate('bills', { where: { name: 'Default' } });
    if (!user) { throw 'notFound'; }

    let defaultBill = user.bills[0];
    if (defaultBill.incomePercents < incomePercents) {    // check if percents are correct
      throw 'incorrectPercents';
    }

    await Bill.update({ id: defaultBill.id })   // set new percents in default bill
      .set({
        incomePercents: defaultBill.incomePercents - incomePercents,
      });


    await Bill.create({
      name: name,
      incomePercents: incomePercents,
      description: description,
      userOwner: this.req.session.userId,
      sum: sum
    });

  }


};
