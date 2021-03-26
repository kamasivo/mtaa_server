const Bill = require("../../models/Bill");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const transaction = require("./transaction");

module.exports = {


    friendlyName: 'View all transaction',
  
  
    description: 'View all transaction of user.',
  
  
    exits: {
      success: {
        description: 'Returning all transaction that belongs logged in user.'
      },
      notFound: {
        description: 'No user with the specified ID was found in the database.',
        responseType: 'notFound'
      }
    },
  
    fn: async function () {
      var userId = this.req.session.userId;

      var user = await User.findOne({ id: userId }).populate('alltransactions');
      if (!user) { throw 'notFound'; }

      return {
        alltransactions: user.alltransactions
      };
    }
  
  
  };
  