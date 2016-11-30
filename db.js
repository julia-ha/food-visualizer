var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');


/*
var Image = new mongoose.Schema({
	caption: String,
	url: String
});

var ImagePost = new mongoose.Schema({
	title: String,
	images: [Image]
});
*/

var User = new mongoose.Schema({
  // username, password provided by plugin
  list: [{type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  results: [{type: mongoose.Schema.Types.ObjectId, ref: 'Results'}]
});

//Items
//user is only responsible for adding the name of the food
//when posted to user's list of items, group will be assigned by web app
//(possibly using a food database from USDA or similar) to determine food group of item
var Item = new mongoose.Schema({
    food: {type: String, required: true},
    group:{type: String}
});

//List
//keeps track of all items added by user
var List = new mongoose.Schema({
    //user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    createdAt: {type: Date},
    items: [Item]
});



//ImagePost.plugin(URLSlugs('title'));

mongoose.model('User', User);
mongoose.model('Item', Item);
mongoose.model('List', List);

mongoose.Promise = global.Promise;
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
