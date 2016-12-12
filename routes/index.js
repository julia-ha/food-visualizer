require('../db.js');

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Item = mongoose.model('Item');


router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req,res,next) {
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
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your username or password is already taken'});
    } else {
      console.log("in here");
      passport.authenticate('local')(req, res, function() {
      	console.log(req.user.username);
        res.redirect('/users/' + req.user.username);
      });
    }
  });   
});

router.get('/users/:username', function(req, res) {
  User
    .findOne({username: req.params.username})
    .populate('items').exec(function(err, user) {
    var showForm = !!req.user && req.user.username == user.username;
    res.render('postFood', { 
      showForm: showForm, 
      items: user.items,
      username: user.username
    });
  });
});

router.post('/users/:username', function(req, res) {
	var food = new Item({
		food: req.body.postNewFood,
		user: req.user._id,
    foodType: req.body.postNewFoodGroup
	});

  food.save(function(err, savedFood, count) {
    if (err) {return res.send(500, 'Error occurred: database error. Click back button to return to user page.');}
    req.user.items.push(savedFood._id);
    req.user.save(function(err, savedUser, count) {
      res.redirect('/users/' + req.user.username);
    });
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect("/");
});

router.post('/post-food/delete', function(req, res, next){
	User.findOne({username: req.user.username}, function (err, user, count){
		var ids = req.body.checkboxPost;
		if (Array.isArray(ids)){
			for (var i = 0; i < ids.length; i++){
				user.items.pull({_id: ids[i]});
			}
		} else {
			user.items.pull({_id: ids});
		}

		user.save(function(err, items, count){
			res.redirect('/users/' + req.user.username);
		});

	});
});

router.get('/users/:username/api', function(req, res, next) {
  console.log("here now");
  console.log(req.user.username);
  User.findOne({username: req.user.username}, function(err, user, count){
    res.json(user.items.map(function(ele) {
      return {
        'food': ele.food,
        'foodType': ele.foodType
      };
    }));
  });
});



module.exports = router;
