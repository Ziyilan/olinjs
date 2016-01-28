var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var cats = {};

var color = ["black", "white", "ginger", "grey", "olive"];
var name = ['a','b','c','d','e','f','g','h','i','j','k','l',
	'm','n','o','p','q','r','s','t','u','v','w','x','y','z']



cats.newcats = function(req, res){
  var cname = name[Math.round(Math.random()*25)]
  var age = Math.round(Math.random()*15)+1
  var ccolor = color[Math.round(Math.random()*4)]
  var newc = {
    name: cname,
    age: age,
    color: ccolor, 
  };
  db.add(newc);
  res.render("cats", {
        message: "Cat Created:",
        name: cname,
        age: age,
        color: ccolor,
      });
};

cats.listcats = function(req, res){
  var catlist = db.getAll();
  catlist = catlist.sort(function(a,b){
    return parseFloat(a.age) - parseFloat(b.age);
  })
      res.render("catlist", {
        message: "All Cats",
        cats:catlist
      });
};


cats.catcolor = function(req, res){
  
  var color = req.params.color.toLowerCase();
  var newlist = []
  var catlist = db.getAll();
  for (var i = 0; i < catlist.length; i++) {
    if (catlist[i].color === color) {
      console.log(catlist[i])
      newlist.push(catlist[i])
    };
  };
  res.render("catlist", {
        message: "Cats",
        cats:newlist
      });
};


cats.deletecat = function(req, res){
  var catlist = db.getAll();
  var sortedlist = catlist.sort(function(a,b){
    return parseFloat(a.age) - parseFloat(b.age);
  })
  var tar = sortedlist[sortedlist.length-1]
  var indexes = catlist.map(function(obj, index) {
    if(obj == tar) {
        return index;
    }
  }).filter(isFinite)
  db.remove(indexes)
};


module.exports = cats;

//-------------------------------------------------------------------------


// //function that constructs and returns lizard object
// function Lizard(name){
//   var lizard = {
//     name: name,
//   };
//   return lizard;
// }

// //get all lizard names
// router.get('/names', function(req, res, next){
//   var lizards = db.getAll();
//   var msg = "Lizard names are: ";
//   lizards.forEach(function(liz){
//     msg = msg + liz.name + ",";
//   })
//   res.send(msg);
// });

// // create new lizard named Bob
// router.get('/new', function(req, res, next) {
//   db.add(Lizard("Bob"));
//   res.send("Added lizard!");
// });

// module.exports = router;