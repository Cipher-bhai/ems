/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import express from 'express'
import authMiddleware from "../middleware/authmiddleware.js"
import { getSummary } from '../controllers/dashboardController.js'

const router = express.Router()

router.get("/summary",authMiddleware,getSummary)

export default router