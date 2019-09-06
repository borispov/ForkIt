import { GraphQLScalarType } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  signIn,
  signUp,
  retrieveUser,
  getUsers,
  addRecipeToUser,
  addRecToUser
} from './models/UserService';
import {
  checkRecipe,
  cookRec,
  getRecipes,
  oneRecipe,
} from './models/RecipeService';
// import Date, { serialize, parseValue, parseLiteral } from './utils/scalar-helper'

const createToken = (user, secret, expiresIn) => {
  const { firstName, email } = user
  console.log('in token func')
  return jwt.sign({ firstName, email }, secret, { expiresIn })
}

export const resolvers = {

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date type scalar',
    serialize: (val) => val.getTime(),
    parseValue: (val) => new Date(val),
    parseLiteral: (ast) => new Date(ast.value),
    // parseValue, serialize, parseLiteral
  }),

  Query: {
    // Get user's credentials
    getCurrentUser: async(root, { email }, { currentUser, User }) => {
      const usrEmail = email || currentUser.email
      return retrieveUser(usrEmail, User)
    },

    getAllUsers: async(root, args, { User }) => await getUsers(User),

    // get single recipe
    getRecipe: async(root, { _id }, { Recipe }) => oneRecipe(_id, Recipe),


    // get all recipes
    getAllRecipes: async(root, { author }, { Recipe }) => getRecipes(Recipe, author)
  },

  Mutation: {

    // -------------------------------------------
    // ---------- USER MUTATIONS -----------------
    // -------------------------------------------

    signupUser: async (root, { firstName, lastName, email, password }, { User }) => {

      const newUser = await signUp(firstName, lastName, email, password, User)
      console.log('user registered && logged in')
      return { token: createToken(newUser, 'secret', '24hr') }
    },

    // Log in, Logic is in ./models/UserService
    signinUser: async(root, {email, password}, { User }) => {

      try {
        console.log(email, password)
        const usr = await signIn(email, password, User)
        return { token: createToken(usr, 'secret', 43200) }
      } catch(e) {
        return console.error(e)
      }

    },



    // -----------------------------
    // ---- RECIPE MUTATIONS -------
    // -----------------------------

    // Recipes -- add recipe
    // TODO: Better Error Handling.
    // args: name, description, instructions, ingridients, difficulty, image, time, author.
    // { authorID, name, description, instructions, time, author, difficulty, image, ingridients},
    addRecipe: async(
      root,
      { authorID, ...restArg },
      { Recipe, User }
    ) => {
      const newRecipe = await new Recipe({authorID, ...restArg}).save()
      await addRecToUser(authorID, newRecipe._id, User)
    },

    // Adding reference ID to user's list. 
    addRecipeToKitchen: async(
      root,
      { email, _recID },
      { User , RecipeList }
    ) => await addRecipeToUser(email, _recID)(User, RecipeList),

    // Current Implementation: FIND USER -> FIND RECIPE by "refID" -> modify it (add date to list, inc totalCooks)
    // TODO: Better Error Handling 
    cookRecipe: async(
      root, 
      { _recID, email },
      { User, RecipeList}
    ) => {

      console.log('email: ', email)

      const user = await retrieveUser(email, User)
      const hasRecipe = checkRecipe(user.recipeList, _recID)
      if (!hasRecipe) {
        await addRecipeToUser(email, _recID)(User, RecipeList)
        await user.save()
        console.log(`between adding a rec and a timeout`)
        setTimeout( async () => {
          let newUser = await retrieveUser(email, User)
          await cookRec(newUser.recipeList, _recID)
          newUser.save()
        }, 250)

      } else {
        await cookRec(user.recipeList, _recID)
        user.save()
      }
    }


  }
}
