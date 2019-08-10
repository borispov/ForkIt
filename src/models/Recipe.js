import mongoose from 'mongoose';

const Schema = mongoose.Schema

const RecipeSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true,
  },

  instructions: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  image: String,

  ingridients: {
    type: Array,
    default: [],
    required: true
  },

  author: {
    type: String,
    default: 'anonymous'
  },

  authorID: {
    type: String
  },

  time: {
    type: String,
    default: 'N/A'
  },

  lastCookedAt: {
    type: Date,
    default: Date.now
  }

})

const Recipe = mongoose.model('Recipe', RecipeSchema)
export default Recipe
