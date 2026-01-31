/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from "express"
import { login,verify } from "../controllers/authController.js" 
import authmiddleware from "../middleware/authmiddleware.js"

const router = express.Router()

router.post("/login",login) 
router.get("/verify",authmiddleware,verify) 

export default router;   