const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WagerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // probably indexed
  },

  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    index: true
  },

  title: {
    type: String,
    required: true,
    index: true
  },

  description: {
    type: String,
    required: true
  },

  karma_points: {
    type: Number,
    required: true
  },

  due_date: {
    type: Date,
    default: null
  },

  wager_choices: {
    // type: [String],
    type: [new Schema({
      option: { type: String, required: true },
      probability: { type: Number },
      winner: { type: Boolean, default: false }
    })],
    required: true
  },

  expired: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
});

module.exports = Wager = mongoose.model("Wager", WagerSchema);