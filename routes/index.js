var express = require('express');
require('../db.js');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');

var myList = new List({});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
		res.render('postFood', {items: myList.items});
		console.log(myList.items);
		
});

router.post('/home', function(req, res, next) {
	console.log("req.body.postNewFood "+ req.body.postNewFood);
	var food = new Item({
		food: req.body.postNewFood
	});

	console.log("myList" + myList);
	myList.items.push(food);

	myList.save(function(err, images, count) {
		console.log(err);
		if (err === null){
			console.log(myList.items);
			res.redirect('/home');
		}
		//mongoose.disconnect();
	});
	

	//List.find({}, function(req, res, next))


});

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
				myList.items.id(ids[i]).remove();
			}
		} else{
			myList.items.id(ids).remove();
		}

		myList.save(function(err, images, count){
			res.redirect('/home');
		});

	//});
});


module.exports = router;
