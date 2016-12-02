require('../db.js');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
//var List = mongoose.model('List');
var Item = mongoose.model('Item');

//var myList = new List({});

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req,res,next) {
  // NOTE: use the custom version of authenticate so that we can
  // react to the authentication result... and so that we can
  // propagate an error back to the frontend without using flash
  // messages
  passport.authenticate('local', function(err,user) {
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
        res.redirect('/users/' + user.username);
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
  // NOTE: notice that this form of authenticate returns a function that
  // we call immediately! See custom callback section of docs:
  // http://passportjs.org/guide/authenticate/
});


router.get('/register', function(req, res) {
  res.render('register');
});


router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      res.render('register',{message:'Your username or password is already taken'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      console.log("in here");
      passport.authenticate('local')(req, res, function() {
      	console.log(req.user.username);
        res.redirect('/users/' + req.user.username);
      });
    }
  });   
});

router.get('/users/:username', function(req, res) {
  // NOTE: use populate() to retrieve related documents and 
  // embed them.... notice the call to exec, which executes
  // the query:
  // - http://mongoosejs.com/docs/api.html#query_Query-populate
  // - http://mongoosejs.com/docs/api.html#query_Query-exec
  User
    .findOne({username: req.params.username})
    .populate('items').exec(function(err, user) {
    // NOTE: this allows us to conditionally show a form based
    // on whether or not they're on "their page" and if they're
    // logged in:
    //
    // - is req.user populated (yes means they're logged in and we 
    // have a user
    // - is the authenticated user the same as the user that we
    // retireved by looking at the slug?
    var showForm = !!req.user && req.user.username == user.username;
    res.render('postFood', { 
      showForm: showForm, 
      items: user.items, 
      username: user.username
    });
  });
});

router.post('/users/:username', function(req, res) {
  // NOTE: we're grabbing the _id from request.user
  // and saving it into the image object
  console.log("req.body.postNewFood "+ req.body.postNewFood);
	var food = new Item({
		food: req.body.postNewFood,
		user: req.user._id
	});

  food.save(function(err, savedFood, count) {
    // NOTE: we're grabbing the image id from the
    // saved image to add to the user's image array
    req.user.items.push(savedFood._id);
    req.user.save(function(err, savedUser, count) {
      res.redirect('/users/' + req.user.username);
    });
  });


});


/*
// GET home page
router.get('/home', function(req, res, next) {	
		res.render('postFood', {items: myList.items});
		console.log(myList.items);
});

router.post('/home', function(req, res, next) {
	console.log("req.body.postNewFood "+ req.body.postNewFood);
	var food = new Item({
		food: req.body.postNewFood
	});

	//console.log("myList" + myList);
	//console.log("food "+ food);

	myList.items.push(food);
	console.log("myList items "+myList.items);

	
	res.redirect('/home');
	

});
*/

/*

router.get('/image-posts/:slug', function(req, res, next) {
	ImagePost.findOne({slug: req.params.slug}, function(err, images, count){
		res.render('detail', {details: images});
	});
});

*/

router.post('/post-food/delete', function(req, res, next){
	//List.findOne({slug:req.body.hiddenSlug}, function(err, post, count){
		var ids = req.body.checkboxPost;
		if (Array.isArray(ids)){
			for (var i = 0; i < ids.length; i++){
				//myList.items.id(ids[i]).remove();
				var x = myList.items.index
			}
		} else{
			myList.items.id(ids).remove();
		}

		res.redirect('/home');
		/*
		myList.save(function(err, images, count){
			res.redirect('/home');
		});
		*/

	//});
});


module.exports = router;
