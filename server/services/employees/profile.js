const User = require('../../models/User');

function getProfile(request, response) {
  User.findOne({ _id: request.query.id })
    .exec((error, doc) => {
      if (error) return response.json(error);
      response.json(doc);
    });
}

function updateProfile(request, response) {
  let record = {
    name: request.body.name,
    email: request.body.email,
    profession: request.body.profession,
    role: request.body.role,
    username: request.body.username,
  };
  if (request.body.password) {
    record['password'] = request.body.password;
  }
  User.findOneAndUpdate({ _id: request.body.id }, record, { new: true })
    .exec()
    .then(() => {
      User.find({})
        .sort({'createdAt': 'desc'})
        .then(doc => {
          return response.json(doc);
        })
        .catch(error => {
          return response.json(error);
        });
    })
    .catch(error => {
      return response.json(error);
    });
}

module.exports = {
  getProfile: getProfile,
  updateProfile: updateProfile,
}