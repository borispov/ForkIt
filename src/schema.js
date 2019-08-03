import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  type Ingridient {
    name: String!
    quantity: String!
  }

  type Recipe {
    _id: ID
    name: String!
    description: String!
    instructions: String!
    difficulty: String!
    image: String
    ingridients: [Ingridient]
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
    getRecipe: Recipe
    getAllRecipes: [Recipe]
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
      difficulty: String!,
      image: String,
      ingridients: [String!]
    ): Recipe
  }

`
