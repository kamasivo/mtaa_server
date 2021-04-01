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
  },

  exits: {
    success: {
      description: 'New bill created.',
      responseType: 'created'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound',
    }
  },

  fn: async function ({ name, incomePercents, description }) {
    var userId = this.req.session.userId;

    await Bill.create({
      name: name,
      incomePercents: incomePercents,
      description: description,
      userOwner: userId
    }).then(() => sails.log.info('successfuly added'));

  }


};
