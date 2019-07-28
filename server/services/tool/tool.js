'use strict';

const Tools = require('../../models/Tools');
const UserTools = require('../../models/UserTools');

function add(request, response) {
  const logoPath = `http://localhost:3001/src/components/assets/${request.body.name.charAt(0).toUpperCase()}${request.body.name.slice(1)}.png`;
  Tools.findOne({ name: request.body.name }, (error, tool) => {
    if (error) return response.json(error);
    if (!tool) {
      new Tools({
        name: request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
        homePage: request.body.link,
        logoPath: logoPath,
        className: request.body.name.toLowerCase()
      })
      .save()
      .then(doc => {
        new UserTools({
          name: request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
          homePage: request.body.link,
          userID: request.body.userID,
          logoPath: logoPath,
          className: request.body.name.toLowerCase(),
        })
        .save()
        .then(doc => {
          let newToolToJSON = doc.toJSON();
          newToolToJSON['success'] = true;
          newToolToJSON['messages'] = ['New Tool Successfully Added'];
          return response.json(newToolToJSON);
        })
        .catch(error => {
          return response.json({
            success: false,
            messages: [
              error.errors.toolName.message,
              error.errors.toolID.message,
              error.errors.userID.message
            ]
          });
        })
      }).catch(error => {
        return response.json({
          success: false,
          messages: [
            error.errors.name.message,
            error.errors.homePage.message,
            error.errors.className.message
          ]
        });
      })
    } else {
      new UserTools({
        name: request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
        homePage: request.body.link,
        userID: request.body.userID,
        logoPath: logoPath,
        className: request.body.name.toLowerCase(),
      })
      .save()
      .then(doc => {
        let newToolToJSON = doc.toJSON();
        newToolToJSON['success'] = true;
        newToolToJSON['messages'] = ['New Tool Successfully Added'];
        return response.json(newToolToJSON);
      })
      .catch(error => {
        return response.json({
          success: false,
          messages: [
            error.errors.toolName.message,
            error.errors.toolID.message,
            error.errors.userID.message
          ]
        });
      })
    }
  });
}

function get(request, response) {
  const {
    role, id,
  } = request.query;

  if (role !== undefined && role === 'Admin' && role.toLowerCase() === 'admin') {
    Tools.find({})
    .sort({'createdAt': 'desc'})
    .then(docs => {
      return response.json(docs);
    })
    .catch(error => {
      return response.json({ success: false, message: error.ValidationError });
    });
  } else {
    UserTools
    .find({ userID: request.query.id })
    .sort({'createdAt': 'desc'})
    .exec((error, employeeTools) => {
      if (error) return response.json(error);
      return response.json(employeeTools);
    });
  }
}

function remove(request, response) {
  if (request.body.admin.role === 'Admin' && request.body.admin.role.toLowerCase() === 'admin') {
    Tools
    .findOneAndDelete({ _id: request.body.toolID })
    .exec((error, doc) => {
      if (error) return response.json(error);
      Tools
      .find({})
      .then(docs => {
        response.json({
          'success': true,
          'message': `${doc.name} is deleted successfully.`,
          'tools': docs
        });
      })
      .catch(error => {
        return response.json({success: false, message: error});
      })
    });
  } else {
    UserTools
    .findOneAndDelete({ _id: request.body.toolID })
    .exec((error, doc) => {
      if (error) return response.json(error);
      UserTools
        .find({})
        .then(docs => {
          response.json({
            'success': true,
            'message': `${doc.name} is deleted successfully.`,
            'tools': docs
          });
        })
        .catch(error => {
          return response.json({success: false, message: error});
        })
    });
  }
}

module.exports = {
  add: add,
  get: get,
  remove: remove
}