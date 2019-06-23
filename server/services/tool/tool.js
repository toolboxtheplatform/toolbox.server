'use strict';

const Tools = require('../../models/Tools');

function add(request, response) {
  const logoPath = `./${request.body.name}.png`;
  new Tools({
    name: request.body,
    homePage: request.body.link,
    logPath: logPath
  }).save((error, doc) => {
    if (error) return response.json(errmsg);
    let newObj = doc.toJSON();
    newObj['success'] = true;
    newObj['message'] = 'New Tool Successfully Added';

    response.json(newObj);
  });
}

module.exports = {
  add: add
}