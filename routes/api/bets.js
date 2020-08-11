const express = require("express");
const router = express.Router();
const validateBet = require("../../validation/bet");
const mongoose = require("mongoose");
const Bet = require("../../models/Bet");
const merge = require("lodash").merge;
const { ObjectId } = mongoose.Types;


// GET a user's bets
// GET a wager's bets 'wagers/:wager_id'
// POST a new bet to a wager 'wagers/:wager_id'

router.get("/users/:user_id", (request, response) => {
  Bet.find({ user: ObjectId(request.params.user_id) })
    .then(bets => response.json(bets))
    .catch(errors => response.status(400).json("An error occurred with fetching a user's bets."));
});

router.get("/wagers/:wager_id", (request, response) => {
  Bet.find({ wager: ObjectId(request.params.wager_id) })
    .then(bets => response.json(bets))
    .catch(errors => response.status(400).json("An error occurred with fetching a wager's bets."))
});


router.post("/wagers/:wager_id", (request, response) => {
  const { errors, isValid } = validateBet(request.body);
  if (!isValid) { return response.status(400).json(errors); }

  const { user_id, amount_bet, option } = request.body;
  // debugger;

  // user: access current user instead of passing in user_id
  const newBet = new Bet({
    user: ObjectId(user_id),
    wager: ObjectId(request.params.wager_id),
    amount_bet: String(amount_bet),
    option
  });
  newBet.save().then(bet => response.json(bet));
});

module.exports = router;