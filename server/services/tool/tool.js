'use strict';

const Tools = require('../../models/Tools');

function add(request, response) {
  const logoPath = `./${request.body.name}.png`;
  const newTool = {
    name: request.body.name,
    homePage: request.body.link,
    logoPath: logoPath
  };

  new Tools(newTool).save().then(doc => {
    let newToolToJSON = doc.toJSON();
    newToolToJSON['success'] = true;
    newToolToJSON['message'] = 'New Tool Successfully Added';

    return response.json(newToolToJSON);
  }).catch(error => {
    return response.json(error);
  });
}

function fetch(request, response) {
  Tools.find({})
    .then(docs => {
      return response.json(docs);
    })
    .catch(error => {
      return response.json(error);
    });
}

module.exports = {
  add: add,
  fetch: fetch
}