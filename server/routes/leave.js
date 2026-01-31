/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import authMiddleware from "../middleware/authmiddleware.js"
import { addLeave, getLeave,getLeaves,getLeaveDetail,updateLeave } from "../controllers/leaveController.js"



const router = express.Router()

router.post('/add', authMiddleware, addLeave)
router.get('/detail/:id', authMiddleware, getLeaveDetail) 
router.get('/:id/:role', authMiddleware, getLeave)
router.get('/', authMiddleware, getLeaves)
router.put('/:id', authMiddleware, updateLeave)




export default router 