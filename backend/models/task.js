const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  state: { type: Boolean, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
});

module.exports = mongoose.model('Task', taskSchema);
/* timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },*/
