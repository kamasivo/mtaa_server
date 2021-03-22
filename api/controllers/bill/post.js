module.exports = {


  friendlyName: 'View bills',


  description: 'View all bills of user.',


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged out.'
    },

  },


  fn: async function () {

    // Clear the `userId` property from this session.
    delete this.req.session.userId;

    // Broadcast a message that we can display in other open tabs.
    if (sails.hooks.sockets) {
      await sails.helpers.broadcastSessionChange(this.req);
    }

    // Then finish up, sending an appropriate response.
    // > Under the covers, this persists the now-logged-out session back
    // > to the underlying session store.
    if (!this.req.wantsJSON) {
      throw { redirect: '/login' };
    }

  }


};
