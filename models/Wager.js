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
    type: [String],
    required: true
  },
}, {
  timestamps: true
});

module.exports = Wager = mongoose.model("Wager", WagerSchema);