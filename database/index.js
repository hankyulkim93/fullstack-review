const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//get notified if connection is successful
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});

let repoSchema = mongoose.Schema({
  name: String,
  html_url: String,
  size: Number,
  language: String
}, {versionKey: false});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  Repo.insertMany(data, function(err, result) {
    if (err) {
      console.log("saveerror: ", err);
    } else {
      callback(null, result)
    }
  })
};
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  //use insertMany if data is array of repos with information

module.exports.save = save;