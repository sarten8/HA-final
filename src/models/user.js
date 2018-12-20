import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import config from '../config'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'e-mail required'],
      validate: validator.isEmail
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'username required'],
      minlength: 3,
      maxlength: 16,
      validate: username => !username.match(/\W+/)
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password required']
    },
    sessionId: { type: String, select: false }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  const user = this
  try {
    const hash = await bcrypt.hash(user.password, config.saltRounds)
    user.password = hash
    next()
  } catch (err) {
    return err
  }
})

export default mongoose.model('User', UserSchema)
