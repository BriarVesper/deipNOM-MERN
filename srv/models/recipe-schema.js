const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipeSchema = new Schema({
    title: { type: String },
    description: { type: String },
    source: { type: String },
    instructions: { type: String },
    ingredients : { type: String },
    image : { type: String }
  }, {
    collection: 'recipes'
  });

module.exports = mongoose.model('Recipe', recipeSchema)