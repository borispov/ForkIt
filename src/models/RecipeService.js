import mongoose from 'mongoose';
import { addRecipeToUser } from './UserService';

const isEq = inVal => outVal => inVal === outVal
const singleR = rec => _recID => {
  return isEq(rec.refID)(_recID)
}
const findRecipeInList = rec => id => singleR(rec)(id)

const userHasRecipe = arr => prop => id => arr.some(obj => isEq(obj[prop])(id))

export const checkRecipe = (recipes, id) => userHasRecipe(recipes)('refID')(id)

export const cookRec = async ( recipeList, _recID) => {

  const userRecipe = await recipeList.filter((x) => findRecipeInList(x)(_recID))[0];

  const updatedDates = [new Date(), ...userRecipe.lastCooked]
  const newTotalCooks = userRecipe.totalCooks + 1
  userRecipe.lastCooked = updatedDates
  userRecipe.totalCooks = newTotalCooks
  console.log(`Recipe has been cooked: ${newTotalCooks} times by user.`)
  return userRecipe
}


export const oneRecipe = async ( _id, ctx ) => {
  const recipe = await ctx.findOne({ _id })
  if (!recipe) throw new Error('Recipe was not found');
  return recipe
}

export const getRecipes = ( author ) => async ( Recipe, User ) => {
  const user = await User.findOne({email: author})
  const rids = user.recipeList.map(x => x.refID)
  const allRecipes = await Recipe.find({ _id: { "$in" : rids }})
  return allRecipes

  // Get Author's Made recipes if you want to store them separately. 
  // return author
  //   ? await ctx.find({ author: author }).sort({ createdAt: "desc" })
  //   : await ctx.find().sort({ createdAt: "desc" })
}

export const getAllRecipes = async Recipe => await Recipe.find({})
