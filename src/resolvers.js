import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (user, secret, expiresIn) => {

  const { firstName, email } = user

  return jwt.sign({ firstName, email }, secret, { expiresIn })
 }
export const resolvers = {

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
      console.log(recipe)
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

      return { token: createToken(user, 'secret', '43200') }

    },

    // Recipes -- add recipe
    addRecipe: async(
      root,
      {name, description, instructions, time, author, difficulty, image, ingridients},
      { Recipe }
    ) => {
      console.log('inside addRecipe query, here are the details: ', ingridients)
      const newRecipe = await new Recipe({
        name,
        description,
        instructions,
        difficulty,
        author,
        time,
        image,
        ingridients
      }).save()
    },
  }
}
