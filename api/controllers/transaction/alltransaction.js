const Bill = require("../../models/Bill");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const transaction = require("./transaction");

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
 //       var user = await User.findOne({ id: userId }).populate('bills').then((user)=> {
 //           var bills = await Bill.findOne({id:user.bills}).populate("transactions")
 //       });
        var user = await User.findOne({id: userId}).populate('bills').populate('transactions');
        user.transactions = await transaction.find()

        sails.log.info(bills)
        

        if (!user) { throw 'notFound'; }
    
        return {
          transactions: bills.transactions
        };
    }
  
  
  };
  