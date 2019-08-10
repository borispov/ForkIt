import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_R = 9
const Schema = mongoose.Schema

const RecipeListSchema = new Schema({
  refID: {
    type: String,
    required: true
  },

  totalCooks: {
    type: Number,
    default: 0
  },

  lastCooked: [Date]
})

const UserSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  joinDate: {
    type: Date,
    Default: Date.now
  },

  recipeList: [RecipeListSchema]

})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')){
    return next()
  }
  bcrypt.genSalt(SALT_R, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash

      next()
    })
  })
})

export const RecipeList = mongoose.model('RecipeList', RecipeListSchema)
export const User = mongoose.model('User', UserSchema)

// const Pitt = new User({
//   firstName: 'Pitt',
//   lastName: 'McConary',
//   email: 'PitMc@mail.ru',
//   password: '123123',
//   recipeList: [{
//     refID: '123idid123'
//   }]
// }).save().then(z => {
//   console.log(z)
// }).catch(b => console.log(b))


const usr = async () => { 
  // const us = await User.findOneAndUpdate({'recipeList.refID': '123idid123'},{'$inc': {'recipeList.$.totalCooks': 0}, '$set': {'recpieList.$.lastCooked': [new Date()]}}, async (err, data) => {
  const us = await User.findOne({firstName: 'Pitt'}, async (err, data) => {
    const doc = await data.recipeList.filter(x => x.refID === '123idid123')[0]
    const updatedList = [
      new Date(),
      ...doc.lastCooked
    ]
    const newTotalCooks = doc.totalCooks + 1
    doc.lastCooked = updatedList
    doc.totalCooks = newTotalCooks
    data.save()
  })
  // us.recipeList.totalCooks += 1
  // us.save()
  // console.log(us)
}

// usr()
