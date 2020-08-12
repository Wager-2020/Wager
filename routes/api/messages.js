const express = require("express");
const router = express.Router();
const validateMessage = require("../../validation/message");
const Message = require("../../models/Message");
const mongoose = require("mongoose");
const merge = require("lodash").merge; 

/**
 * GET 'n' messages from a group /messages/groups/:group_d
 * POST a message /messages
 * 
 * GET 'n' messages /messages
 * POST a message in a group /messages/groups/:group_id
 */

const NUM_MESSAGES_TO_DISPLAY = 10;

router.get("/", (req, res) => {
  Message.find()
    .sort({ createdAt: -1 })
    .limit(NUM_MESSAGES_TO_DISPLAY)
    .then(messages => res.json(messages))
    .catch(errors => res.status(404).json(errors));
});

router.post("/", (req, res) => {
  const { errors, isValid } = validateMessage(req.body);
  
  if (!isValid) { return res.status(400).json(errors); }
  
  const { user, body } = req.body;
  const newMessage = new Message({
    user, body
  });
  
  newMessage.save().then(message => res.json(message));
  
});


router.get("/groups/:group_id", (req, res) => {
  Message.find({ group_id: req.params.group_id })
    .sort({ createdAt: -1 })
    .limit(NUM_MESSAGES_TO_DISPLAY)
    .then(messages => response.json(messages))
    .catch(errors => response.status(404).json({ nomessagesfound: "OH NO, THERE AIN'T NO MESSAGES!"}));
});

router.post("/groups/;group_id", (req, res) => {
  const { errors, isValid } = validateMessage(req.body);

  if (!isValid) { return res.status(400).json(errors); }

  const { user, body } = req.body;
  const group = req.params.group_id;
  const newMessage = new Message({
    user, group, body
  });
  
  newMessage.save().then(message => res.json(message));
});

module.exports = router;