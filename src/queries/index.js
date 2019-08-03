import gql from 'graphql-tag';

enum Difficulty {
  EASY
  MEDIUM
  HARD
}

export const ADD_RECIPE = gql`
  mutation (
    $name: String!
    $description: String!
    $instructions: String!
    $difficulty: Difficulty!
    $image: String
    $ingridients: [String]
  ) {
    addRecipe(
      name: $name,
      description: $description,
      instructions: $instructions,
      difficulty: $difficulty,
      $image: $image,
      ingridients: $ingridients
    )
  }
`

export const SIGNUP_USER = gql`
  mutation($firstName: String!, $lastName: String!, $email:String!, $password:String!) {
    signupUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){token}
  }
`

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      firstName
      lastName
      email
    }
  }
`

export const GET_RECIPES = gql`
  query {
    getAllRecipes {
      name,
      description,
      instructions,
      difficulty,
      image,
      ingridients
    }
  }
`

export const 
