import User from "./models/User.js"
import bcrypt from "bcrypt" 
import "./db/db.js"


let userRegister = async () => {
   
 
   try {
      const hashPassword = await bcrypt.hash("Satyendra12@", 10)
      const newUser = new User({
         name: "bharti",
         email: "bhartisatyendra44@gmail.com",
         password: hashPassword,
         role: "admin",
         profileImage: "https://media.licdn.com/dms/image/v2/D5603AQFzAerKPG3T9g/profile-displayphoto-shrink_800_800/B56ZQo1Z4ZHoAc-/0/1735851877411?e=1758758400&v=beta&t=JaxgOSq_whUGPSnikVXfH5pX8WnMSOZZ5mEpuA0awXs"
      })
      await newUser.save()

   } catch (error) {
      console.log(error);
   }
}
userRegister();