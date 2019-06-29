const User = require('../../models/User');

function add(request, response) {
  new User(request.body)
    .save()
    .then(doc => {
      User.find({}, (error, docs) => {
        if (error) return response.json(error);
        return response.json(docs);
      });
    })
    .catch(error => {
      return response.json(error);
    });
}

module.exports = {
  add: add
}