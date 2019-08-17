const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//get notified if connection is successful
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  html_url: String,
  size: Number,
  language: String
}, {versionKey: false}, {unique: true}); //hide version key property and prevent duplicate values into database

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  Repo.insertMany(data, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(null, result)
    }
  })
};
  // This function should save a repo or repos to
  // the MongoDB

  //use insertMany if data is array of repos with information

let query = (callback) => {
  Repo.find({'size': {$gte:0}}, function(err, repos) {
    if (err) {
      console.log(err);
    } else {
      callback(null, repos);
    }
  });
};

module.exports.save = save;
module.exports.query = query;