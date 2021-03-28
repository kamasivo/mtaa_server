const Category = require('../../models/Category');

module.exports = {


  friendlyName: 'Delete category',


  description: 'Delete category by id.',


  inputs: {
    categoryId: {
      type: 'number',
      required: true
    },
    billId: {
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

  fn: async function ({ categoryId, billId }) {
    await Bill.removeFromCollection(billId, 'expenditureTypes').members(categoryId);

    // this is not working todo
    await Category.destroyOne({ id: categoryId });

    return {
      response: 'Category was deleted'
    };

  }


};
