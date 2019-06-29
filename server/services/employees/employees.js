const User = require('../../models/User');
const Tools = require('../../models/Tools');

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

function list(request, response) {
  User.find({}).exec((error, docs) => {
    if (error) return response.json(error);
    Tools.find({}).exec((err, tools) => {
      if (err) return response.json(err);
      let obj = [{
        'users': docs,
        'tools': tools
      }];
      return response.json(obj);
    });
    // return response.json(docs);
  });
}

module.exports = {
  add: add,
  list: list
}