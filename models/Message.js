const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // author
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    // required: true
  },
  body: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = Message = mongoose.model("Message", MessageSchema);