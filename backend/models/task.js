const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  state: { type: Boolean, required: true },
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }
});

module.exports = mongoose.model('Task', taskSchema);