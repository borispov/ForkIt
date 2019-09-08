import { gql } from 'apollo-server-express'

// Note: Testing using ingridients as a String rather than a custom type with two Strings in it.

export const typeDefs = gql`

  scalar Date

  enum Difficulty {
    EASY
    MEDIUM
    HARD
  }

  type Ingridient {
    type: String!
    amount: String!
  }

  input Ingr{
    type: String!
    amount: String!
  }

  # Can Integrate Total Cooks by all users. 

  type Recipe {
    _id: ID
    name: String!
    description: String!
    instructions: String!
    author: String
    time: String
    difficulty: String!
    image: String
    ingridients: String!
    lastCookedAt: Date
    totalCooks: Int
  }

  type RecList {
    refID: ID,
    lastCooked: [String],
    totalCooks: Int
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    password: String!
    bio: String
    profileImage: String
    email: String!
    joinDate: String
    recipeList: [RecList]
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser(email: String): User
    getUserProfile: User
    getAllUsers: [User]
    profilePage(Email: String!): User
    getRecipe(_iG: String!): Recipe
    getUserRecipes(author: String): [Recipe]
    getAllRecipes: [Recipe]
  }

  type Mutation {

    signupUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!
    ): Token

    signinUser(
      email: String!,
      password: String!
    ): Token

    addRecipe(
      name: String!,
      description: String!,
      instructions: String!,
      author: String,
      time: String,
      difficulty: String!,
      image: String,
      ingridients: String!,
      authorID: String
    ): Recipe

    addRecipeToKitchen(
      email: String!,
      _recID: String!,
    ): User

    cookRecipe(
      _recID: String!,
      email: String!,
    ): User

  }

`
