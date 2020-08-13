const express = require("express");
const router = express.Router();
const validateMessage = require("../../validation/message");
const Message = require("../../models/Message");
const User = require("../../models/User");
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
  Message.find({})
    .sort({ createdAt: -1 })
    .limit(NUM_MESSAGES_TO_DISPLAY)
    .then(messages => {
      let resultingMessages = [];
      messages.forEach(async msg => {
        User.findById(msg.user)
        .then(user => {
          resultingMessages.push({
            id: msg.id,
            body: msg.body,
            createdAt: msg.createdAt,
            user: {
              id: user.id,
              handle: user.handle
            },
          });

          if (resultingMessages.length === messages.length) {
            res.json(resultingMessages);
          }
        });
      });
    })
    .catch(errors => res.status(404).json(errors));
});

router.post("/", (req, res) => {
  const { errors, isValid } = validateMessage(req.body);
  
  if (!isValid) { return res.status(400).json(errors); }
  
  const { user, body } = req.body;

  User.findById(user)
  .then(user => {
    const message = new Message({ user, body });
    
    message.save().then(msg => {
      const newMessage = {
        id: msg.id,
        body: msg.body,
        createdAt: msg.createdAt,
        user: {
          id: user.id,
          handle: user.handle
        },
      };
      res.json(newMessage)
    });
  });
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