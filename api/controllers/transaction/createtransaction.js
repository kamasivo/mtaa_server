module.exports = {


    friendlyName: 'Create income category',
  
  
    description: 'Create new income category for user.',
  
    inputs: {
      sum: {
        type: 'number',
        required: true
      },
      type: {
        type: 'string',
        required: true
      },
      account_id: {
        type: 'number',
        required: true
      },
      category_id: {
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
  
    fn: async function ({ sum, type, account_id, category_id }) {
      await Transaction.create({
        sum: sum,
        clasification: type,
        belongs: account_id,
        category: category_id
      }).then(() => sails.log.info('successfully created'));
  
  
      return {
        response: 'created successfully'
      };
  
    }
  
  
  };
  