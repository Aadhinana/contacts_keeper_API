const mongoose = require("mongoose");

const conatctSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Contact = mongoose.model("Contact", conatctSchema);

module.exports = Contact;
