let acl = require('acl');
const mongoose = require('mongoose');

acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));

module.exports = {
  init: () => {
    acl.allow([
     {
       roles: 'admin',
       allows: [
         {
           resources: ['/api/v1/categories/*'],
           permissions: '*'
         }
       ]
     }
    ])
  },

  getAcl: function() {
    return acl;
  }
}