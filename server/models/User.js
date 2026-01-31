/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true }, 
   // role: { type: String, required: true },
   role: { type: String, enum: ["admin", "employee"], required: true },
   profileImage:{type:String},
   createAt:{type:Date,default:Date.now},
   updateAt:{type:Date,default:Date.now}
})
const User = mongoose.model("User", UserSchema)

export default User
       