const request = require('request');
const config = require('../config.js');

let getReposByUsername = (term, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${term}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    if (err) {
      console.log(err);
    } else {
      callback(null, body);
    }
  });
};

module.exports.getReposByUsername = getReposByUsername;