# We Are What You Eat? (jjh497-final-project)

## Overview
What you consume to fuel your body matters. The food and agricultural products you use not only affect you, but they also play a role in the larger systems of global industrial food and agriculture.

We Are What You Eat? is a web application that allows users to input the food they've consumed and keep track of the different environmental impacts of their choices.

##Data Model
This web app will store Users, Items, List
* users can have multiple items
* users can only have one list

First draft schema:


```javascript
//User
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
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	createdAt: {type: Date, required: true},
	items: [Item]
});
```
## Wireframes
![Alt text](/wireframes/IMG_01.JPG)
![Alt text](/wireframes/IMG_02.JPG)
![Alt text](/wireframes/IMG_03.JPG)

## Site Map!
![Alt text](/sitemap/sitemap.JPG)

## User Stories
1. as a user, I can create and login to an account
2. as a user, I can view all items I've eaten so far
3. as a user, I can add and delete items to list of things I've eaten so far
4. as a user, I can see my items by food group
5. as a user, I can see the environmental results of my items

## Research Topics
* (6 points) Integrate user authentication
* (3 points) External API
** USDA food database to identify input


