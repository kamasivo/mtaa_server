module.exports = {


    friendlyName: 'View all transaction',
  
  
    description: 'View all transaction of user.',
  
  
    inputs: {
      userId: {
        type: 'number',
        required: true
      },
    },
  
    exits: {
      success: {
        description: 'Returning all transaction that belongs logged in user.'
      },
      notFound: {
        description: 'No user with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function ({ userId }) {
        var user = await User.findOne({ id: userId }).populate('transactions');
        sails.log.info(user);
        if (!user) { throw 'notFound'; }
    
        return {
          bills: user.transactions
        };
    }
  
  
  };
  