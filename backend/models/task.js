const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  state: { type: Boolean, required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', default: null },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);
