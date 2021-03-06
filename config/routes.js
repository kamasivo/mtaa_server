/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/user/logout': { action: 'account/logout' },
  'PUT   /user/password': { action: 'account/update-password' },
  'PUT   /user/profile': { action: 'account/update-profile' },
  'PUT   /user/login': { action: 'entrance/login' },
  'POST  /user': { action: 'entrance/signup' },
  'GET /user': { action: 'user/get' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login': { action: 'entrance/update-password-and-login' },


  // bills
  'GET /bill/users': { action: 'bill/list' },
  'GET /bill/:billId': { action: 'bill/get' },
  'PUT /bill': { action: 'bill/put' },
  'POST /bill': { action: 'bill/post' },
  'DELETE /bill/:billId': { action: 'bill/delete' },

  // categories
  'GET /category/income': { action: 'category/income' },
  'GET /category/expenditure/:billId': { action: 'category/expenditure' },
  'POST /category/income': { action: 'category/create-income' },
  'POST /category/expenditure': { action: 'category/create-expenditure' },
  'DELETE /category/:categoryId': { action: 'category/delete' },

  // transaction
  'GET /transactions/': { action: 'transaction/all-transaction' },
  'GET /transaction/:transactionId': { action: 'transaction/transaction' },
  'GET /transaction/incomes': { action: 'transaction/incomes' },
  'GET /transaction/expenditures': { action: 'transaction/expenditures' },
  'GET /transaction/incomes/bill/:billId': { action: 'transaction/incomes-bill' },
  'GET /transaction/expenditures/bill/:billId': { action: 'transaction/expenditures-bill' },
  'POST /transaction/income': { action: 'transaction/create-income' },
  'POST /transaction/splitincome': { action: 'transaction/split-income' },
  'POST /transaction/expenditure': { action: 'transaction/create-expenditure' },
  'PUT /transaction': { action: 'transaction/put-transaction' },
  'DELETE /transaction/:transactionId': { action: 'transaction/delete' },
};
