import gql from 'graphql-tag';

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $name: String!,
    $description: String!,
    $instructions: String!,
    $difficulty: Difficulty!,
    $image: String,
    $ingridients: [Ingr],
  ) {
    addRecipe(
      name: $name,
      description: $description,
      instructions: $instructions,
      difficulty: $difficulty,
      image: $image,
      ingridients: $ingridients
    ) {
      name
    }
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
      firstName,
      lastName,
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
      ingridients,
    }
  }
`
