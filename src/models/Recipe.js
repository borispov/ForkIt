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
    type: Map,
    of: String,
    required: true
  }

})

const Recipe = mongoose.model('Recipe', RecipeSchema)
export default Recipe
