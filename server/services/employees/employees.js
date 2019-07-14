const User = require('../../models/User');
const Tools = require('../../models/Tools');
const UserTools = require('../../models/UserTools');
const checkAdmin = require('../../utils');

function add(request, response) {
  let list = [];
  new User({
    name: request.body.data.name,
    email: request.body.data.email,
    username: request.body.data.username,
    password: request.body.data.password,
    profession: request.body.data.profession,
    role: `${request.body.data.role.charAt(0).toUpperCase()}${request.body.data.role.slice(1)}`
  })
  .save()
  .then(doc => {
    User.find({})
    .sort({'createdAt': 'asc'})
    .exec((error, docs) => {
      if (error) return response.json(error);
      return response.json(docs);
    });
  })
  .catch(error => {
    return response.json(error);
  });
}

function list(request, response) {
  checkAdmin.isAdmin(request.query.userID)
  .then(admin => {
    User.find({})
      .sort({'createdAt': 'desc'})
      .exec((error, docs) => {
      if (error) return response.json(error);
      Tools.find({}).exec((err, tools) => {
        if (err) return response.json(err);
        let obj = [{
          'users': docs,
          'tools': tools
        }];
        return response.json(obj);
      });
    });
  })
  .catch(error => {
    return response.json(error);
  });
}

function fetch(request, response) {
  UserTools
    .find({ userID: request.query.userid })
    .sort({'createdAt': 'desc'})
    .exec((error, docs) => {
      if (error) return response.json(error);
      response.json(docs);
    });
}

function saveUserTools(tools, user) {
  return new Promise((resolve, reject) => {
    let toolItems = [];
    tools.map((tool, index) => {
      tool['userID'] = user._id;
      new UserTools(tool)
        .save()
        .then(item => {
          toolItems.push(item);
          if (index === tools.length - 1) {
            resolve(toolItems);
          }
        })
        .catch(error => {
          reject({ success: false });
        });

    });
  });
}

module.exports = {
  add: add,
  list: list,
  fetch: fetch
}