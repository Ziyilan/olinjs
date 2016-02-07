var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cats = {};

var catdb = require('../models/catmodel.js');
// It's convention to call your imported cat model "Cat" -- just so you're aware


var color = ["black", "white", "ginger", "grey", "olive"];
var name = ['a','b','c','d','e','f','g','h','i','j','k','l',
	'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];



cats.newcats = function(req, res){
  var cname = name[Math.round(Math.random()*25)]
  var age = Math.round(Math.random()*15)+1
  var ccolor = color[Math.round(Math.random()*4)]
  var newdata = new catdb({
    name: cname,
    age: age,
    color: ccolor, 
  });
  // Something for you to think about: how could you have modularized new cat generation?

  newdata.save(function (err) {
    if (err) {
      console.log("Problem saving new cat", err);
    } else {
      /*
      If you don't put the "res.render" in an "else" block, you'll be rendering
      the cat you created even if there's an error saving it! Not good.
      Later we'll talk a little more about good error handling -- you should really
      be sending a response in the error case too, something like:
        res.status(500).send('Problem saving new cat');
      */
      res.render("cats", {
        message: "Cat Created:",
        name: cname,
        age: age,
        color: ccolor,
      });
    }
  });
};

cats.listcats = function(req, res){
  var catlist = [];
  catdb.find(function (err, catlist) {
    // Comparing to the new cat route -- in this case you're *returning* the error,
    // which is why the rest of your function doesn't need to be in an else block. This works!
    if (err) return console.error(err);
    catlist = catlist.sort(function(a,b){
      return parseFloat(a.age) - parseFloat(b.age); // nice use of the compare function!
    }); 
    res.render("catlist", {
      message: "All Cats",
      cats: catlist
    });
  });
};
// The spacing in your listcats route really confused me -- it looked like the res.render
// was outside of the callback, and you actually had it inside the callback, in the right place.
// This is why conventional spacing is important! Usually functions or if statements are at the same
// indent level as their end brackets or parentheses.


cats.catcolor = function(req, res) {
  // You said you weren't sure about this route, and it looks great to me :)
  catdb.find(function (err, catlist) {
    if (err) return console.error(err); // I would do this first!

    var color = req.params.color.toLowerCase();
    var newlist = [];
  
    for (var i = 0; i < catlist.length; i++) {
      if (catlist[i].color === color) {
        newlist.push(catlist[i])
      };
    }; 
    // check out the "filter" method built into arrays -- here's an example
    // http://adripofjavascript.com/blog/drips/filtering-arrays-with-array-filter.html

    res.render("catlist", {
      message: "Cats",
      cats: newlist
    });
  });
};


cats.catage = function(req, res){
  catdb.find(function (err, catlist) {
    var newlist = [];
    if (err) return console.error(err);
    
    for (var i = 0; i < catlist.length; i++) {
      if (catlist[i].age < 10 && catlist[i].age > 5) {
        newlist.push(catlist[i])
      };
    }; // Again, this is a great place to use the built in "filter" method

    res.render("catlist", {
      message: "Young Cats (5-10 years old)",
      cats:newlist
    });
  });
};


cats.deletecat = function(req, res){

  catdb.find(function (err, catlist) {
  if (err) return console.error(err);
    catlist = catlist.sort(function(a,b){
    return parseFloat(a.age) - parseFloat(b.age)});

  var old_id = catlist[catlist.length-1]._id;
  catdb.find({ _id:old_id }).remove().exec();

})
}


module.exports = cats;

