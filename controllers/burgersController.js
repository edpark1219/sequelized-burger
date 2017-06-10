var express = require('express');
var router = express.Router();
var db = require('../models');

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get('/burgers', function(req, res) {
    db.Burger.findAll({}).then(function(data) {

        res.render('index', { burgers: data });

    });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
    db.Burger.create({ 
      burger_name: req.body.burger_name 
    }, { 
      devoured: req.body.devoured 
    }).then(function(data) {
        res.redirect('/burgers')
    })
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
    db.Burger.update({ 
      devoured: req.body.devoured 
    }, {
        where: { 
          id: req.params.id 
        }
    }).then(function(data) {
      res.redirect('/burgers')
    });
});

module.exports = router;
