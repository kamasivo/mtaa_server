module.exports = {


  friendlyName: 'Update password',


  description: 'Update the password for the logged-in user.',


  inputs: {

    password: {
      description: 'The new, unencrypted password.',
      type: 'string',
      required: true
    },
    newPassword: {
      description: 'The old, unencrypted password.',
      type: 'string',
      required: true
    }

  },

  exits: {
    badPassword: {
      description: `The provided password does not match.`,
      responseType: 'unauthorized'
    }
  },


  fn: async function ({ password, newPassword }) {
    var newHashed = await sails.helpers.passwords.hashPassword(newPassword);

    var user = await User.findOne({ id: this.req.session.userId });
    sails.log.info(user.password);

    await sails.helpers.passwords.checkPassword(password, user.password)
      .intercept('incorrect', 'badPassword');

    await User.updateOne({ id: this.req.me.id })
      .set({
        password: newHashed
      });
  }


};
