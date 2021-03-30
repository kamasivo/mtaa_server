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
    }
  },

  fn: async function ({ CategoryId }) {
    await Category.destroy({ id: CategoryId });
  
    return {
      response: 'Category was deleted'
    };

  }


};
