import moongose, { Schema } from "mongoose";

const UserCollection = 'users'

const userSchema =  new Schema({
  username: String,
  email: String,
  password: String, 
});

export const UserModel = moongose.model( UserCollection, userSchema );