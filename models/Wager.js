const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema;

const WagerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },

  group: {
    type: String,
    default: "Public",
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

  due_date: {
    type: Date,
    default: null
  },

  wager_choices: {
    // type: [String],
    type: [new Schema({
      option: { type: String, required: true },
      probability: { type: Number, default: 0.5 },
      winner: { type: Boolean, default: false },
      karma: { type: Number, default: 1000 * 0.5 }
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