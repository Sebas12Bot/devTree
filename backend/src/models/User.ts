import mongoose, { Schema, Document } from 'mongoose'
export interface IUser extends Document {
  handle: string
  name: string
  lastName: string
  email: string
  password: string,
  description: string
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
  },
  description: {
    type: String,
    default: ''
  }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User