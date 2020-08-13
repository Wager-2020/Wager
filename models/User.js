const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    // group names should be unique identifiers
    wallet: {
      type: { 
        value: {
          group: { type: String, required: true, default: "Public", index: true },
          currentBalance: { type: Number, required: true, default: 1000 }
        }
     },
      default: { "Public": { group: "Public", currentBalance: 1000 }}
    }
  }, {
    timestamps: true
  });

module.exports = User = mongoose.model("User", UserSchema);