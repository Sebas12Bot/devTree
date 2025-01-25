import mongoose, { Schema } from 'mongoose'

interface IUser {
  handle: string
  name: string
  lastName: string
  email: string
  password: string
}

const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User