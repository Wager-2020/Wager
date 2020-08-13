const express = require("express");
const router = express.Router();
const validateBet = require("../../validation/bet");
const mongoose = require("mongoose");
const Bet = require("../../models/Bet");
const Wager = require("../../models/Wager");
const User = require("../../models/User");
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


// place a bet
router.post("/wagers/:wager_id", async (request, response) => {
  const { errors, isValid } = validateBet(request.body);
  if (!isValid) { return response.status(400).json(errors); }
  const { user_id, amount_bet, option } = request.body;

  // might need to update bet amoun_won immediately, if so, make a request to Wagers, find wager that corresponsds with this bet, check for expiration value, if true, put amount_won as a value in newBet

  // user: access current user instead of passing in user_id

  const newBet = new Bet({
    user: ObjectId(user_id),
    wager: ObjectId(request.params.wager_id),
    option,
  });

  if (amount_bet && String(amount_bet).length > 0) {
    newBet.amount_bet = amount_bet;
  }

  await Wager.findById(newBet.wager).then(wager => {

    let total_karma_for_wager = 0;
    
    wager.wager_choices.forEach((choice, idx) => {
      if (choice.option === newBet.option) {
        wager.wager_choices[idx].karma += newBet.amount_bet;
        newBet.odds = wager.wager_choices[idx].probability;
      }
      total_karma_for_wager += wager.wager_choices[idx].karma;
    });

    wager.wager_choices.forEach((choice, idx) => {
      wager.wager_choices[idx].probability = choice.karma / (1.0 * total_karma_for_wager);
    });

    wager.save();
  });

  newBet.save().then(bet => response.json(bet));
});

module.exports = router;