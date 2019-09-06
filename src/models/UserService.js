import mongoose from 'mongoose';
// import User from './User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const isEq = inVal => outVal => inVal === outVal
const singleR = rec => isEq(rec.refID)(_recID)


export const getUsers = async (ctx) => await ctx.find();

export const retrieveUser = async (email, ctx) => await ctx.findOne({email: email})
const registerUser = Ctx => async obj => await new Ctx(obj).save()

export const signIn = async (email, pass, ctx) => {
  const user = await retrieveUser(email, ctx)
  if (!user) throw new Error(`No User Found With That Email:${email}`)
  const isValidPw = await bcrypt.compare(pass, user.password)
  if (!isValidPw) { throw new Error('Wrong password, try again') }
  console.log('--Logging in user ::', email)
  return user
}

export const signUp = async (firstName, lastName, email, password, ctx) => {

  const user = await retrieveUser(email, ctx)
  if (user) throw new Error('A user with this email already exists')
  const newUser = registerUser(ctx)({firstName, lastName, email, password})
  return newUser
}

export const addRecToUser = async (authorID, recID, ctx) => {

  return await ctx.findOneAndUpdate(
    { email: authorID },
    {$push: { "recipeList": recID }},
    (err, data) => {
      if (err) console.log(err)
      console.log(data)
    }
  )
}

export const addRecipeToUser = (email, _recID) => async (User, RecipeList) => {
  await User.findOne({ email }, async (err, data) => {
    const newRecipeToList = await new RecipeList({refID: _recID})
    data.recipeList = [...data.recipeList, newRecipeToList]
    data.save()
    console.log('success')
  })
}
