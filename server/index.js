/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import "./db/db.js"
import authRouter from "./routes/auth.js"
import departmentRouter from './routes/department.js' 
import employeeRouter from './routes/employee.js' 
import salaryRouter from "./routes/salary.js"
import leaveRouter from "./routes/leave.js"
import settingRouter from "./routes/setting.js"
import dashboardRouter from "./routes/dashboard.js"

const app = express()
const PORT = process.env.PORT || 10000;

app.use(express.json())
app.use(express.static('public/uploads'))
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)   
app.use('/api/employee', employeeRouter)     
app.use('/api/salary',salaryRouter) 
app.use('/api/leave',leaveRouter) 
app.use('/api/setting',settingRouter) 
app.use('/api/dashboard',dashboardRouter)    

app.listen(PORT, () => {
   console.log(`server listen on port ${PORT}`); 
})