/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState(null)
   const { login } = useAuth()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {

      e.preventDefault()
      try {
         const response = await axios.post("https://ems-backend-snhp.onrender.com/api/auth/login",{ email, password })
         if (response.data.success) {
            login(response.data.user)
            localStorage.setItem("token", response.data.token)
            if (response.data.user.role === "admin") {
               navigate("/admin-dashboard")
            } else {
               navigate("/employee-dashboard")
            }
         }

      } catch (error) {
         if (error.response && !error.response.data.success) {
            setError(error.response.data.error)
         } else {
            setError("Server Error")
         }
      }
   }

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">

         <h2 className="font-pacific text-3xl text-white">Employee Management System</h2>

         <div className="border shadow-lg p-6 w-80 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>

            {error && <p className='text-red-500'>{error}</p>}

            <form onSubmit={handleSubmit}>
               {/* Email Field */}
               <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="email">Email:</label>
                  <input
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                     type="email"
                     placeholder="Enter Email" required

                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               {/* Password Field */}
               <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="password">Password:</label>
                  <input
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                     type="password" required
                     placeholder="*********"
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>

               {/* Remember Me and Forgot Password */}
               <div className="mb-4 flex items-center justify-between">
                  <label className="inline-flex items-center">
                     <input type="checkbox" className="form-checkbox text-teal-600" />
                     <span className="ml-2 text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-teal-600 hover:underline">Forgot Password?</a>
               </div>

               {/* Submit Button */}
               <div className="mb-4">
                  <button
                     type="submit"
                     className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
                  >
                     Login
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;





















// import React from 'react'

// const Login = () => {
//    return (

//       <div className="flex flex-col item-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6" >

//          <h2 className="font-pacific text-3xl text-white ">Employee management System</h2>

//          <div className='border shadow p-6 w-80 bg-white'>
//             <h2 className='text-2xl font-bold mb-4'>Login</h2>

//             <form>

//                <div className='mb-4'>
//                   <label className='block text-grey-700' htmlFor="email">Email:</label>
//                   <input className='w-full px-3 py-2 border' type="email" placeholder='Enter Email' name="email" required />
//                </div>

//                <div className='mb-4'>
//                   <label className='block text-gray-700 ' htmlFor="Password">Password</label>
//                   <input className='w-full px-3 py-2 border' type="Password" placeholder='*********' name="email" required />
//                </div>

//                <div className='mb-4 flex items-center justify-between '>
//                   <label className='inline-flex items-center ' >
//                      <input type="checkbox" className='form-checkbox' />
//                      <span className='ml-2 text-green-700 '>Remember me</span>
//                   </label>
//                   <a href="#" className='text-teal-600'>Forget Password?</a>
//                </div>

//                <div className='mb-4'>
//                   <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
//                </div>
//             </form>
//          </div>
//       </div>
//    )
// }
// export default Login