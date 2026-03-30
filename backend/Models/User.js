import mongosse from "mongoose";
import { uniqueId } from "../utils";

const userSchema = mongosse.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
    default: () => uniqueId(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
})

const User = mongosse.model('User', userSchema)

export default User
