const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("List", listSchema);