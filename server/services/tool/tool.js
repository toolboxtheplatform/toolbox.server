'use strict';

const Tools = require('../../models/Tools');
const UserTools = require('../../models/UserTools');

function add(request, response) {
  const logoPath = `http://localhost:3001/src/components/admin/tool/assets/${request.body.name.charAt(0).toUpperCase()}${request.body.name.slice(1)}.png`;
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
          toolName: request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
          toolID: doc._id,
          userID: request.body.userID
        })
        .save()
        .then(doc => {
          let newToolToJSON = doc.toJSON();
          newToolToJSON['success'] = true;
          newToolToJSON['message'] = 'New Tool Successfully Added';
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
        toolName: request.body.name.charAt(0).toUpperCase() + request.body.name.slice(1),
        toolID: tool._id,
        userID: request.body.userID
      })
      .save()
      .then(doc => {
        let newToolToJSON = doc.toJSON();
        newToolToJSON['success'] = true;
        newToolToJSON['message'] = 'New Tool Successfully Added';
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

function fetch(request, response) {
  Tools.find({})
    .then(docs => {
      return response.json(docs);
    })
    .catch(error => {
      return response.json({ success: false, message: error.ValidationError });
    });
}

module.exports = {
  add: add,
  fetch: fetch
}