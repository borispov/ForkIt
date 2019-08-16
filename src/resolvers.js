import { GraphQLScalarType } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Date, { serialize, parseValue, parseLiteral } from './utils/scalar-helper'

const createToken = (user, secret, expiresIn) => {
  const { firstName, email } = user
  return jwt.sign({ firstName, email }, secret, { expiresIn })
}

export const resolvers = {

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date type scalar',
    parseValue, serialize, parseLiteral
  }),

  Query: {
    // Get user's credentials
    getCurrentUser: async(root, args, { currentUser, User }) => {
      if (!currentUser) return null
      const user = await User.findOne({ email: currentUser.email })
      return user
    },

    getAllUsers: async(root, args, { User }) => {
      const users = await User.find()
      return users
    },

    // get single recipe
    getRecipe: async(root, { id, name }, { Recipe }) => {
      const recipe = await Recipe.find({_id: id, name})
      // console.log(recipe)
      if (!recipe) throw new Error('recipe was not found')
      return recipe
    },

    // get all recipes
    getAllRecipes: async(root, { author }, { Recipe }) => {
      const recipes = author ?
        await Recipe.find({author: author}).sort({
          createdAt: "desc"
        }) :
        await Recipe.find().sort({createdAt: "desc"})
      return recipes
    }
  },

  Mutation: {

    // -------------------------------------------
    // ---------- USER MUTATIONS -----------------
    // -------------------------------------------

    // This is how we register a user to the system
    signupUser: async (root, { firstName, lastName, email, password }, { User }) => {
      const user = await User.findOne({ email })
      if (user) { 
        throw new Error('A user with this email already exists')
      }

      const newUser = await new User({
        firstName,
        lastName,
        email,
        password
      }).save()

      return { token: createToken(newUser, 'secret', '24hr') }
    },

    // Log in, no further comments, code is self explanatory. 
    signinUser: async(root, {email, password}, { User }) => {

      const user = await User.findOne({ email })
      if (!user) { 
        throw new Error('User has not been found')
      }

      const isValidPw = await bcrypt.compare(password, user.password)
      if (!isValidPw) {
        throw new Error('Wrong password, try again')
      }

      console.log('--Logging in user ::', email)

      return { token: createToken(user, 'secret', 43200) }

    },



    // -----------------------------
    // ---- RECIPE MUTATIONS -------
    // -----------------------------

    // Recipes -- add recipe
    // TODO: Better Error Handling.
    addRecipe: async(
      root,
      { authorID, name, description, instructions, time, author, difficulty, image, ingridients},
      { Recipe, User }
    ) => {
      const newRecipe = await new Recipe({
        authorID,
        name,
        description,
        instructions,
        difficulty,
        author,
        time,
        image,
        ingridients
      }).save()
      const user = await User.findOneAndUpdate(
        { email: authorID },
        {$push: { "recipeList": newRecipe._id }},
        (err, data) => {
          if (err) console.log(err)
          console.log(data)
        }
      )
    },

    // Adding reference ID to user's list. 
    addRecipeToKitchen: async(
      root,
      { email, _recID },
      { User , RecipeList }
    ) => {
      await User.findOne({ email }, async (err, data) => {
        const newRecipeToList = await new RecipeList({refID: _recID})
        // for debugging...
        console.log(newRecipeToList)
        const newState = [
          ...data.recipeList,
          newRecipeToList
        ]
        data.recipeList = newState
        data.save()
      })
    },

    // Current Implementation: FIND USER -> FIND RECIPE by "refID" -> modify it (add date to list, inc totalCooks)
    // TODO: Better Error Handling 
    cookRecipe: async(
      root, 
      { email, _recID }, 
      { User }
    ) => {
      const userInQuestion = await User.findOne({ email }, async (err, data) => {
        if (err) console.log(err)

        const userRecipe = await data.recipeList.filter(rec => rec.refID === _recID)
        const updatedDates = [
          new Date(),
          ...userRecipe.lastCooked
        ]
        const newTotalCooks = userRecipe.totalCooks + 1
        userRecipe.lastCooked = updatedDates
        userRecipe.totalCooks = newTotalCooks
        console.log('-- updating recipe cook information: 1) total Cooks 2) last date')
        data.save()
      })
    }


  }
}
