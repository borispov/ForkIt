import { gql } from 'apollo-server-express'

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

  type Recipe {
    _id: ID
    name: String!
    description: String!
    instructions: String!
    author: String
    time: String
    difficulty: String!
    image: String
    ingridients: [Ingridient]
    lastCookedAt: Date
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
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
    getUserProfile: User
    getAllUsers: [User]
    profilePage(Email: String!): User
    getRecipe(_id: ID!): Recipe
    getAllRecipes(author: String): [Recipe]
  }

  type Mutation {

    signupUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!): Token

    signinUser(
      email: String!, 
      password: String!): Token

    addRecipe(
      name: String!,
      description: String!,
      instructions: String!,
      author: String,
      time: String,
      difficulty: String!,
      image: String,
      ingridients: [Ingr],
      authorID: String
    ): Recipe

    addRecipeToKitchen(
      email: String!,
      _id: String!,
    ): User

    cookRecipe(
      _recID: String!,
      email: String!,
    ): User

  }

`
