/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBaseRoutes = ({ children, requiredRole }) => {
   const { user, loading } = useAuth()

   if (loading) {
     return <div>Loading.....</div>
   }

   if (!requiredRole.includes(user.role)) {
      <Navigate to="/unauthorized" />
   }
   
   return user ? children : <Navigate to="/login" /> 

}

export default RoleBaseRoutes
