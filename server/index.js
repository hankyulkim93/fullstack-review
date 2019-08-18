const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const indexdb = require('../database/index.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let reposData = JSON.parse(data);
      indexdb.save(reposData, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });

  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {

  let sizeCompare = (a, b) => {
    const sizeA = a.size;
    const sizeB = b.size;

    let comp = 0;
    if (sizeA > sizeB) {
      comp = -1;
    } else if (sizeA < sizeB) {
      comp = 1;
    }
    return comp;
  }

  // This route should send back the top 25 repos
  indexdb.query((err, data) => {
    if (err) {
      console.log(err);
    } else {
      let sortData = data.sort(sizeCompare);
      res.send(sortData);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

