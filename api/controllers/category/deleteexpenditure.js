module.exports = {


  friendlyName: 'Delete category',


  description: 'Delete category by id.',


  inputs: {
    categoryId: {
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: 'Category was successfully updated.'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    },
    notPermitted: {
      description: 'You are not permitted to see this record.',
      responseType: 'notpermitted'
    }
  },

  fn: async function ({ categoryId }) {

    var category = await Category.findOne({ id: categoryId });

    sails.log.info(category.expenditureTypes);
    // if (category.expenditureTypes !== this.req.session.userId) {
    //   throw 'notPermitted';
    // }


    await Category.destroy({ id: categoryId });
  }


};
