module.exports = {


  friendlyName: 'Create bills',


  description: 'Create new bill for user.',

  inputs: {
    userId: {
      type: 'number',
      required: true
    },
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
  },

  exits: {
    success: {
      description: 'New bill created.',
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound',
    }
  },

  fn: async function ({ userId, name, incomePercents, description }) {
    sails.log.info('post starting');

    await Bill.create({
      name: name,
      incomePercents: incomePercents,
      description: description,
      userOwner: userId
    }).then(() => sails.log.info('successfuly added'));


    return {
      // bills: user.bills
    };

  }


};
