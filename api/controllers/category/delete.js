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
      description: 'Category was successfully deleted.'
    },
    notFound: {
      description: 'No category with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ categoryId }) {
    var category = await Category.findOne({ id: categoryId });

    if (!category) { throw 'notFound'; }

    if (category.incomeTypes !== this.req.session.userId && category.incomeTypes !== null) {
      throw 'notPermitted';
    }

    var bill = await Bill.findOne({ id: category.expenditureTypes });  // this is bill id to which category belongs is category.expenditureTypes

    if (bill && bill.userOwner !== this.req.session.userId) {
      throw 'notPermitted';
    }

    await Category.destroy({ id: categoryId });
  }


};
