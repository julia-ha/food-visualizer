# My Food Visualizer (jjh497-final-project)

## Overview
What you consume to fuel your body matters. The food and agricultural products you use not only affect you, but they also play a role in the larger systems of global industrial food, agriculture and natural resources.

My Food Visualizer is a web application that allows users to input what they've consumed and view the resource allocation and environmental impact of their food.

In this application, the agricultural resources are sorted into three categories: water, land, and energy---which encompasses fuel, waste, and fertilizer/pesticide use. The visualization of the user's input will be seen in strips of blue (water), green (land), and yellow (energy). Each block of color is calculated by using data from http://environmentalnutrition.org/ and http://waterfootprint.org/ to measure resource use relative to each food group.

##Data Model
This web app will store Users and Items
* users can have multiple items
* items keep track of the item name, the item food type, and the user it corresponds to

Mongoose Schemas:


```javascript
//User
var UserSchema = new mongoose.Schema({
  // username, password provided by Passport plugin
  items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
});

//Items
//user is responsible for adding the name of the food and the food type
var Item = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  food: {type: String, required: true},
  foodType: {type: String}
});
```
## Wireframes
![Alt text](/wireframes/IMG_01.JPG)
![Alt text](/wireframes/IMG_02.JPG)
![Alt text](/wireframes/IMG_03.JPG)

## Site Map!
![Alt text](/sitemap/sitemap.JPG)

## User Stories
1. as a user, I can create and log in to an account
2. as a user, I can view all items I've eaten so far
3. as a user, I can add and delete items to list of things I've eaten so far
4. as a user, I can see the environmental results of my items

## Research Topics
* (6 points) Integrate user authentication
** Implement sign up, registration, secure login and logout
* (2 points) CSS Framework

