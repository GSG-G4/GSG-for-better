const { model, Schema } = require('mongoose');

// Goal Schema
// Defines how to store Goals info

const GoalSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  technology: {
    type: Schema.Types.ObjectId,
    ref: 'technologies',
  },
});

const Goal = model('goals', GoalSchema);

module.exports = Goal;
