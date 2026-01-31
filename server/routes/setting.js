/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import authMiddleware from "../middleware/authmiddleware.js"
import { changePassword } from "../controllers/settingController.js"
             

const router = express.Router()

router.put('/change-password', authMiddleware, changePassword) 



export default router  