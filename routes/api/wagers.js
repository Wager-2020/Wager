const express = require("express");
const router = express.Router();
const validateWager = require("../../validation/wager");
const Wager = require("../../models/Wager");
const mongoose = require("mongoose");
const merge = require("lodash").merge;

/**
 * tested GET all wagers --> /api/wagers 
 * (Need Group) GET all wagers of a group --> /api/wagers/groups/:group_id
 * tested GET one wager --> /api/wagers/:id
 * (Need Group)POST a wager to a group --> /api/wagers/groups/:group_id
 * tested POST a wager --> /api/wagers
 * DELETE a wager --> /api/wagers/:id
 * PATCH a wager --> /api/wagers/:id
 */

// GET all wagers --> /api/wagers
router.get("/", (request, response) => {
  Wager.find()
    .sort({ due_date: -1 })
    .then(wagers => response.json(wagers))
    .catch(errors => response.status(404).json({ nowagersfound: "Dear God, there are no wagers! PANIC!" }))
});

// GET all wagers of a group --> /api/wagers/groups/:group_id
router.get("/groups/:group_id/", (request, response) => {
  Wager.find({ group_id: request.params.group_id })
    .sort({ due_date: -1 })
    .then(wagers => response.json(wagers))
    .catch(errors => response.status(404).json({ nowagersfound: "Woe, there are no wagers for that group. :-(" }))
});

// GET one wager --> /api/wagers/:id
router.get("/:id", (request, response) => {
  Wager.findById(request.params.id)
    .then(wager => response.json(wager))
    .catch(errors => response.status(404).json({ nowagersfound: "That wager don't exist." }))
});

// POST a wager to a group --> /api/wagers/groups/:group_id
router.post("/groups/:group_id", (request, response) => {
  const { errors, isValid } = validateWager(request.body);
  
  if (!isValid) { return response.status(400).json(errors); }

  // const user = // current user;
  
  // to find the group based on route wildcard
  // const group = Group.findById(request.params.group_id);
  
  //body and group are missing right now
  const { title, description, karma_points, due_date, wager_choices } = request.body;

  // need to pass in user who created the new wager
  // need to pass in a group
  const newWager = new Wager({
    title, description, karma_points, due_date, wager_choices
  });

  newWager.save().then(wager => response.json(wager));
});



// POST a wager to a group --> /api/wagers/groups/:group_id
router.post("/", (request, response) => {
  const { errors, isValid } = validateWager(request.body);
  
  if (!isValid) { return response.status(400).json(errors); }

  // const user = // current user;
  
  // to find the group based on route wildcard
  // const group = Group.findById(request.params.group_id);
  
  //body and group are missing right now
  const { title, description, karma_points, due_date, wager_choices } = request.body;

  // need to pass in user who created the new wager
  // need to pass in a group
  const newWager = new Wager({
    title, description, karma_points, due_date, wager_choices
  });

  newWager.save().then(wager => response.json(wager));
});

// DELETE a wager --> /api/wagers/:id
router.delete("/:id", (request, response) => {
  Wager.findById(request.params.id).then(wager => {
    Wager.deleteOne(wager);
    response.json(wager);
  });
});

// PATCH a wager --> /api/wagers/:id
router.patch("/:id", (request, response) => { 
  Wager.findById(request.params.id, (error, wager) => {
    for(let key in request.body) {
      wager[key] = request.body[key];
    }
    wager.save();
    response.json(wager);
  })
});


module.exports = router;