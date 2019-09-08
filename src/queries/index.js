import gql from 'graphql-tag';

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String!,
    $description: String!,
    $instructions: String!,
    $difficulty: String!,
    $time: String,
    $author: String,
    $image: String,
    $ingridients: String!,
  ) {
    addRecipe(name: $name, description: $description, instructions: $instructions, difficulty: $difficulty, ingridients: $ingridients, image: $image, author: $author, time: $time) {
      name
      description
    }
  }
`

export const COOK_RECIPE = gql`
  mutation cookRecipe( $_recID: String!, $email: String!) { 
    cookRecipe(_recID: $_recID, email: $email) {
      firstName
    }
  }
`

export const ADD_TO_KITCHEN = gql`
  mutation addRecipeToKitchen( $_recID: String!, $email: String!) {
    addRecipeToKitchen( _recID: $_recID, email: $email) {
      recipeList {
        refID
      }
    }
  }
`

export const GET_USER_RECIPES = gql`
query ($author: String) {
  getUserRecipes(author: $author) {
    _id,
    name,
    description,
    instructions,
    difficulty,
    image,
    time,
    author,
    ingridients
  }
}
`

// the author variable is for fetching all recipes of specific users.
export const GET_RECIPES = gql`
  query {
    getAllRecipes {
      _id,
      name,
      description,
      instructions,
      difficulty,
      image,
      time,
      author,
      ingridients
    }
  }
`

export const GET_RECIPE = gql`
  query($_id: String!) {
    getRecipe(_id: $_id) {
      _id,
      name,
      description,
      instructions,
      difficulty,
      image,
      time,
      author,
      ingridients
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($firstName: String!, $lastName: String!, $email:String!, $password:String!) {
    signupUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){token}
  }
`

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {token}
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

