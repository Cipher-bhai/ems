/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import authMiddleware from "../middleware/authmiddleware.js"
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js"


const router = express.Router()

router.get('/', authMiddleware, getDepartments)
router.post('/add', authMiddleware, addDepartment)
router.get('/:id', authMiddleware, getDepartment)
router.put('/:id', authMiddleware, updateDepartment)
router.delete('/:id', authMiddleware, deleteDepartment)

export default router 