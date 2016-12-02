var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');



var UserSchema = new mongoose.Schema({
  // username, password provided by Passport plugin
  items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
  //results: [{type: mongoose.Schema.Types.ObjectId, ref: 'Results'}]
});

var Item = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  food: {type: String, required: true}
});




UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.model('Item', Item);
//mongoose.model('List', List);

mongoose.Promise = require('bluebird');
//assert.equal(query.exec().constructor, require('bluebird'));
//mongoose.connect('mongodb://localhost/finalproject');


// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV == 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/finalproject';
}

mongoose.connect(dbconf);
