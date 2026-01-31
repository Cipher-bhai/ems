/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import  Mongoose  from "mongoose";

//  const URLdb = "mongodb://localhost:27017/ems"
 const URLdb = "mongodb+srv://zoom169speedster:Yash123%40@zoom-cluster.wtvvdih.mongodb.net/ems?appName=zoom-cluster"
 Mongoose.connect(URLdb,{
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(()=>{
   console.log("Connected to MongoDB successfully")
})
.catch((error)=>{
   console.log("Error connecting to MongoDB",error);
})




// import mongoose from "mongoose";

// const connectToDatabase = async () =>{
//    try {
//       await mongoose.connect(process.env.MONGODB_URL)
//       console.log("mongoose connect....");
      
//    } catch (error) {
//       console.log(error);
      
//    }
// }

// export default connectToDatabase 






