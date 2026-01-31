/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import authMiddleware from "../middleware/authmiddleware.js"
import { addSalary,getSalary } from "../controllers/salaryController.js"



const router = express.Router()

router.post('/add', authMiddleware, addSalary)
router.get('/:id/:role', authMiddleware, getSalary)


export default router 