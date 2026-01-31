/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';



// Create the user context
const userContext = createContext();

// Define the AuthContext component
const authContext = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true)


   useEffect(() => {
      const verifyUser = async () => {
         try {
            const token = localStorage.getItem('token')
            if (token) {
               const response = await axios.get('https://ems-backend-hkt0.onrender.com/api/auth/verify', {
                  headers: {
                     "Authorization": `Bearer ${token}`
                  }
               })
               if (response.data.success) {
                  setUser(response.data.user)
               }
            } 
            else {
               setUser(null)  
            }
         } catch (error) {
            if (error.response && !error.response.data.error) {
               setUser(null) 
            }
         } finally{
            setLoading(false) 
         }
      }
      verifyUser()
   }, [])

   // Login function
   const login = (user) => {
      setUser(user);
   };

   // Logout function
   const logout = () => {
      setUser(null);
      localStorage.removeItem("token");
   };

   return (
      <userContext.Provider value={{ user, login, logout, loading }}>
         {children}
      </userContext.Provider>
   );
};

// Custom hook to use the UserContext
export const useAuth = () => useContext(userContext);

export default authContext;
