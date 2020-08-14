const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../../models/User")
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const Wager = require("../../models/Wager");
const Bet = require("../../models/Bet");
const { sortUsers } = require('./sorting_util');
const { merge } = require("lodash");


const getBetsAndStatsOfUser = async (user, callback) => {
  const bet = await Bet.find({
      user
    })
    .sort({
      createdAt: -1
    })
    .then(async (bets) => {
      const wagersArr = await Wager.find({});
      let wagers = {};
      wagersArr.forEach(wager => {
        wagers[wager._id] = wager;
      });

      let numWins = 0;
      let numLosses = 0;
      let numPending = 0;
      let totalEarnings = 0;
      let karmaSpentPerGroup = {}; // {{ group: balance }, ...}
      let karmaEarnedPerGroup = {};
      bets.forEach(bet => {
        totalEarnings += bet.amount_won;
        const wager = wagers[bet.wager];
        if (bet.amount_won > 0) {
          numWins++;
        } else if (wager.expired && bet.wager === 0) {
          numLosses++;
        } else {
          numPending++;
        }
        if (!karmaSpentPerGroup[wager.group]) {
          karmaSpentPerGroup[wager.group] = 0;
          karmaEarnedPerGroup[wager.group] = 0;
        }
        karmaSpentPerGroup[wager.group] += bet.amount_bet;
        karmaEarnedPerGroup[wager.group] += bet.amount_won;
      });

      const stats = {
        numWins,
        numLosses,
        numPending,
        totalEarnings,
        karmaSpentPerGroup,
        karmaEarnedPerGroup,
        bets,
        winRatio: (numWins * 1.0) / (1.0 * (numWins + numLosses)),
      }

      if (callback) { 
        callback(stats);
      }
      return stats;
    }).catch(err => { return err; });

    return bet;
}


const MAX_BETS_ALLOWED = 10;
const NUM_LEADERBOARD_USERS_SHOWN = 10;

const mergeWallets = (wallet, deductionWallet, winningWallet) => {
  let resultWallet = merge({}, wallet);
  Object.keys(wallet).forEach(group => {
    if (deductionWallet[group]) {
      resultWallet[group].currentBalance -= deductionWallet[group];
    }
    if (winningWallet[group]) {
      resultWallet[group].currentBalance += winningWallet[group];
    }
  });
  return resultWallet;
}

const formatUser = (user, stats) => {
  let { _id, handle, wallet } = user;

  let {
    numWins,
    numLosses,
    numPending,
    totalEarnings,
    karmaSpentPerGroup,
    karmaEarnedPerGroup,
    bets,
    winRatio
  } = stats;


  return {
    _id,
    handle,
    wallet: mergeWallets(wallet, karmaSpentPerGroup, karmaEarnedPerGroup),
    
    numWins,
    numLosses,
    numPending,
    totalEarnings,
    winRatio,
    bets: bets.slice(0, MAX_BETS_ALLOWED)
  }
}

router.get("/", (req, res) => {
  const {
    leaderboard,
    sortingMethod,
    numUsers,
    searchParams
  } = req.query;

  if (leaderboard) {
    User.find({})
      .then((users) => {
      let resultingUsers = [];
      users.forEach(async (user) => {
        getBetsAndStatsOfUser(user, (stats) => {
          let formattedUser = formatUser(user, stats);
          resultingUsers.push(formattedUser)
          if (resultingUsers.length === users.length) {
            const sorted = sortUsers(resultingUsers, sortingMethod);
            const limit = numUsers ? numUsers : NUM_LEADERBOARD_USERS_SHOWN;
            const limited = sorted.slice(0, limit);
            return res.json(limited);
          }
        });
      });
    })
    .catch(err => res.status(404).json(err))

  } else if (searchParams) {
    let { searchHandle } = JSON.parse(searchParams);

    User.find({ handle: { "$regex": searchHandle, "$options": "i" } }).then(async users => {
      let resultingUsers = [];
      users.forEach(async (user) => {
        getBetsAndStatsOfUser(user, (stats) => {
          let formattedUser = formatUser(user, stats);
          resultingUsers.push(formattedUser)
          if (resultingUsers.length === users.length) {
            return res.json(resultingUsers);
          }
        });
      });
    });
  }
});


router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(async user => {
      let stats = await getBetsAndStatsOfUser(user);

      let formattedUser = formatUser(user, stats)

      return res.json(formattedUser)
    })
    .catch(err => res.status(404).json(err));
});

router.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    handle: req.body.handle
  }).then(user => {
    if (user) {
      errors.handle = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          debugger;
          newUser.save()
            .then(user => {
              debugger;
              const payload = {
                id: user.id,
                handle: user.handle
              };

              jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 3600
              }, (err, token) => {
                debugger;
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // const handle = req.body.handle;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    // handle,
    email
  }).then(user => {
    if (!user) {
      errors.handle = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          handle: user.handle
        };

        jwt.sign(payload, keys.secretOrKey, {
          expiresIn: 3600
        }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

module.exports = router;