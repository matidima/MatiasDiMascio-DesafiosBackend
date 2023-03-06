import moongose, { Schema } from "mongoose";

const UserCollection = 'users'

const userSchema =  new Schema({
  username: String,
  address: String,
  age: Number,
  phone: Number,
  thumbnail: String,
  email: String,
  password: String, 
});

export const UserModel = moongose.model( UserCollection, userSchema );