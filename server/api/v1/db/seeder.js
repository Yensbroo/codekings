/**
 * Libraries
 */
const async = require('async');
const mongoose = require('mongoose');

/**
 * Models
 */
const User = require('../models/User');
const Category = require('../models/Category');

/**
 * config
 */

 const mongoDB = require('../../../config/keys').mongoURI;


 /**
  * Mongoose
  */
 mongoose.connect(mongoDB);
 mongoose.Promise = global.Promise;
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));

 let categories = [];
 let users = [];

 function userCreate(name, email, password) {
   const userDetail = { name: name, email: email, password: password};
   const user = new User(userDetail);

   user.save((err) => {
     if(err) {
       cb(err, null);
       return;
     }
     console.log('New user' + user);
     users.push(user);
     cb(null, user);
   })
 };

 function categoryCreate(name) {
  const categoryDetail = { name: name };
  const category = new User(categoryDetail);

  category.save((err) => {
    if(err) {
      cb(err, null);
      return;
    }
    console.log('New category' + category);
    categoriess.push(category);
    cb(null, category);
  })
};


 function createUsers(cb) {
   async.parallel([
     function(callback) {
       userCreate('admin', 'admin@mail.com', '123pass');
     }
   ], cb)
 }

 function createCategories(cb) {
  async.parallel([
    function(callback) {
      categoryCreate('Javascript');
    },
    function(callback) {
      categoryCreate('PHP');
    },
    function(callback) {
      categoryCreate('HTML');
    },
    function(callback) {
      categoryCreate('CSS');
    },
    function(callback) {
      categoryCreate('Laravel');
    },
    function(callback) {
      categoryCreate('React');
    },
    function(callback) {
      categoryCreate('Angular');
    }
  ], cb)
}

async.series([
  createUsers,
  createCategories
],
function(err, results) {
  if(err) {
    console.log(`FINAL ERR: ${err}`)
  }
  mongoose.connection.close();
});


 