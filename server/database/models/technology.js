const { model, Schema } = require('mongoose');

// Technology Schema
// Defines how to store the technologies

const TechnologySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  resources: [{
    type: String,
  }],
});

module.exports = Technology = model('technologies', TechnologySchema);
