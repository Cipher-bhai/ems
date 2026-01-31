/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import authMiddleware from "../middleware/authmiddleware.js"
import { addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId } from "../controllers/employeeController.js" 


const router = express.Router()

router.get('/', authMiddleware, getEmployees) 
router.post('/add', authMiddleware,upload.single('image'), addEmployee)  
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, updateEmployee)
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId)

export default router 