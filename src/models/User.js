import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_R = 9
const Schema = mongoose.Schema

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
  }

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

const User = mongoose.model('User', UserSchema)
export default User
