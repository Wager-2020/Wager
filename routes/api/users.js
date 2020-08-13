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
      });

      const stats = {
        numWins,
        numLosses,
        numPending,
        totalEarnings,
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

router.get("/", (req, res) => {
  const {
    leaderboard
  } = req.query;
  if (leaderboard) {
    User.find({})
      .then((users) => {
      let resultingUsers = [];
      users.forEach(async (user) => {

        getBetsAndStatsOfUser(user, (stats) => {
          const { _id, handle } = user;

          let {
            numWins,
            numLosses,
            numPending,
            totalEarnings,
            bets,
            winRatio
          } = stats;

          const newUser = {
            _id,
            handle,
            numWins,
            numLosses,
            numPending,
            totalEarnings,
            winRatio,
            bets: bets.slice(0, MAX_BETS_ALLOWED)
          }

          resultingUsers.push(newUser)

          if (resultingUsers.length === users.length) {
            console.log("returnnnnn")
            return res.json(resultingUsers);
          }
        });
        });

    })
    .catch(err => res.status(404).json(err))
  }
});


router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(async user => {
      const {
        _id,
        handle
      } = user;
      // debugger;
      let {
        numWins,
        numLosses,
        numPending,
        totalEarnings,
        bets,
        winRatio
      } = await getBetsAndStatsOfUser(user);
      // debugger;

      return res.json({
        _id,
        handle,
        numWins,
        numLosses,
        numPending,
        totalEarnings,
        winRatio,
        bets: bets.slice(0, MAX_BETS_ALLOWED)
      });
      // })
      // .catch(err => res.status(404).json(err))
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
          newUser
            .save()
            .then(user => {
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