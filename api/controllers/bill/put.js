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
    }
  },

  fn: async function ({ billId, name, incomePercents, description, sum }) {
    var bill = await Bill.findOne({ id: billId });

    if (!bill) { throw 'notFound'; }

    await Bill.update({ id: billId })
      .set({
        name: name,
        incomePercents: incomePercents,
        description: description,
        sum: sum
      }).then(() => sails.log.info('successfuly edited'));

    return {
      bill
    };

  }


};
