module.exports = {


    friendlyName: 'Create income category',
  
  
    description: 'Create new income category for user.',
  
    inputs: {
      sum: {
        type: 'number',
        required: true
      },
      billId: {
        type: 'number',
        required: true
      },
      categoryId: {
        type: 'number',
        required: true
      },
    },
  
    exits: {
      success: {
        description: 'New transaction created.',
      },
      notFound: {
        description: 'No user with the specified ID was found in the database.',
        responseType: 'notFound',
      }
    },
  
    fn: async function ({ sum, billId, categoryId }) {
    var clasification = 'INC';
      var userId = this.req.session.userId;
      await Transaction.create({
        sum: sum,
        classification: clasification,
        belongs: billId,
        user: userId,
        category: categoryId
      }).then(() => sails.log.info('successfully created'));
  
  
      return {
        response: 'created successfully'
      };
  
    }
  
  
  };
  