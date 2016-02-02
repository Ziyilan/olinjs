var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cats = {};

var catdb = require('../models/catmodel.js');


var color = ["black", "white", "ginger", "grey", "olive"];
var name = ['a','b','c','d','e','f','g','h','i','j','k','l',
	'm','n','o','p','q','r','s','t','u','v','w','x','y','z']



cats.newcats = function(req, res){
  var cname = name[Math.round(Math.random()*25)]
  var age = Math.round(Math.random()*15)+1
  var ccolor = color[Math.round(Math.random()*4)]
  var newdata = new catdb({
    name: cname,
    age: age,
    color: ccolor, 
  });


  newdata.save(function (err) {
  if (err) {
    console.log("Problem saving new cat", err);
  }
  res.render("cats", {
        message: "Cat Created:",
        name: cname,
        age: age,
        color: ccolor,
      });
  })
};

cats.listcats = function(req, res){
  var catlist = [];
  catdb.find(function (err, catlist) {
  if (err) return console.error(err);
    catlist = catlist.sort(function(a,b){
    return parseFloat(a.age) - parseFloat(b.age);
  })
      res.render("catlist", {
        message: "All Cats",
        cats:catlist
      });
  })


};


cats.catcolor = function(req, res){
  
  catdb.find(function (err, catlist) {
  var color = req.params.color.toLowerCase();
  var newlist = []
  if (err) return console.error(err);
  
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
  })
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

