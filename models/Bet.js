const mongoose = require("mongoose");
const Schema = mongoose.Schema;



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
  }
});

module.exports = Bet = mongoose.model("Bet", BetSchema);