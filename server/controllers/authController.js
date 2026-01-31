/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"


const login = async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({success:false,error:"User not found"}) 
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
       return  res.status(404).json({success:false,error: "wrong password" }) 
      }
      const token = jwt.sign({ _id: user._id, role: user.role },
         process.env.JWT_KEY, { expiresIn: "10d" } 
      )
      res.status(200).json({success:true, token, user: { _id: user._id, name: user.name, role: user.role },
      })
   } catch (error) {
      res.status(500).json({success:false,error:error.message}) 
      console.log(error)
   }
}

const verify = (req,res)=>{
   return res.status(200).json({success:true,user:req.user})
}

export { login , verify}   
