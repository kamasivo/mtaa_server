const Category = require('../../models/Category');

module.exports = {


  friendlyName: 'Delete category',


  description: 'Delete category by id.',


  inputs: {
    categoryId: {
      type: 'number',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Category was successfully updated.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function ({ categoryId }) {
    var userId = this.req.session.userId;
    await User.removeFromCollection(userId, 'transactionTypes').members(categoryId);

    // this is not working todo
    await Category.destroyOne({ id: categoryId });

    return {
      response: 'Category was deleted'
    };

  }


};
