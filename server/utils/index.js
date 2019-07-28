const User = require('../models/User');

function isAdmin(id) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id }, (error, doc) => {
      if (error) reject(error);
      if (doc.role === 'Admin' || doc.role === 'admin') resolve(true);
      reject({ 
        success: false,
        message: 'This is a restricted area and can only be access by Admins.'
      });
      resolve({ success: true });
    });
  });
}

module.exports = {
  isAdmin: isAdmin
};