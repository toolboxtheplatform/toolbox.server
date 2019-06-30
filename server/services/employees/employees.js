const User = require('../../models/User');
const Tools = require('../../models/Tools');
const UserTools = require('../../models/UserTools');

function add(request, response) {
  let list = [];
  new User({
      name: request.body.data.name,
      email: request.body.data.email,
      username: request.body.data.username,
      password: request.body.data.password
    })
    .save()
    .then(doc => {
      saveUserTools(request.body.data.tools, doc)
        .then(res => {
          User
            .find({})
            .exec((error, docs) => {
            if (error) return response.json(error);
            return response.json(docs);
            // docs.map(user => {
            //   UserTools
            //     .find({ userID: user._id })
            //     .exec((error, tools) => {
            //       list.push({
            //         'user': [{
            //           'data': user,
            //           'tools': tools
            //         }]
            //       });

            //       return response.json(list);
            //   });
            // });
          });
        })
        .catch(error => {
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
  });
}

function fetch(request, response) {
  UserTools
    .find({ userID: request.query.userid }, (error, docs) => {
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