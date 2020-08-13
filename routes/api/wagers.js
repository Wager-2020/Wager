const express = require("express");
const router = express.Router();
const validateWager = require("../../validation/wager");
const Wager = require("../../models/Wager");
const Bet = require("../../models/Bet");
const mongoose = require("mongoose");
const makeRequest = require("../../api_util/odds_api_util");
const { getSportOdds } = require("../../api_util/odds_api_util");
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

const distributeAmountWon = async (bet, wager) => {
  let winningChoice = undefined;
  wager.wager_choices.forEach(choice => {
    if (choice.winner) { 
      winningChoice = choice;
    }
  });

if (winningChoice.option === bet.option) {
  const amountWon = bet.amount_bet / winningChoice.probability;
  bet.amount_won = amountWon;
  // learn how to batch save/update by returning bet, adding return to array, batching array
  await bet.save();
}
// return bet;
}
const distributeEarnings = (wager) => {
  // distribute rewards for winning/losing the wager
  Bet.find({ wager: wager._id }).then((bets) => {
    bets.forEach(async (bet) => {
      await distributeAmountWon(bet, wager);
    });
  })
}

const updateWagerExpirations = (wagers) => {
    const now = new Date();
    wagers = wagers.map(async (wager) => {
      if (wager.due_date.getTime() <= now.getTime()) {
          wager.expired = true;
          distributeEarnings(wager);
          await wager.save();
      }
      return wager;
    });

    return wagers;
  }

//without groups

const { getMlbResults } = require("../../api_util/game_results_api_util");
// GET all wagers --> /api/wagers
router.get("/", (request, response) => {

  // getMlbResults(new Date());

  // getSportOdds();

  Wager.find()
    .sort({ due_date: -1 })
    .then(wagers => {
      updateWagerExpirations(wagers);
      return response.json(wagers);
    })
    .catch(errors => response.status(404).json(errors))
});

// GET one wager --> /api/wagers/:id
router.get("/:id", (request, response) => {
  Wager.findById(request.params.id)
    .then(wager => {
      updateWagerExpirations([wager]);
      return response.json(wager)
    })
    .catch(errors => response.status(404).json(errors))
});


// with groups

// GET all wagers of a group --> /api/wagers/groups/:group_id
router.get("/groups/:group_id/", (request, response) => {
  Wager.find({ group_id: request.params.group_id })
    .sort({ due_date: -1 })
    .then(wagers => response.json(wagers))
    .catch(errors => response.status(404).json(errors))
});

// POST a wager to a group --> /api/wagers/groups/:group_id
router.post("/groups/:group_id", (request, response) => {
  const { errors, isValid } = validateWager(request.body);
  
  if (!isValid) { return response.status(400).json(errors); }

  // const user = // current user;
  
  // to find the group based on route wildcard
  // const group = Group.findById(request.params.group_id);
  
  //body and group are missing right now
  const { title, description, due_date, wager_choices } = request.body;

  // need to pass in user who created the new wager
  // need to pass in a group
  const newWager = new Wager({
    title, description, due_date, wager_choices
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
  const { title, description, due_date, wager_choices } = request.body;

  // need to pass in user who created the new wager
  // need to pass in a group
  const newWager = new Wager({
    title, description, due_date, wager_choices
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