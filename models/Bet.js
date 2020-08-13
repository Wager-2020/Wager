const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// each user should only be able to bet once for a wager.
// figure out uniqueness in scope

const BetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  wager: {
    type: Schema.Types.ObjectId,
    ref: "Wager",
    index: true
  },

  amount_bet: {
    type: Number,
    required: true,
    default: 100
  },

  option: {
    type: String,
    required: true
  },

  amount_won: {
    type: Number,
    default: 0
  },

  odds: {
    type: Number,
    default: 1.0
  }

  // amount_bet stored internally
  // amount_won = (amount_bet / (wager.wager_choices.where("expired: true").probability))
  // amount_won { default: null }
}, {
  timestamps: true
});

module.exports = Bet = mongoose.model("Bet", BetSchema);