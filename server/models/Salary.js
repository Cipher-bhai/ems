/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import mongoose, { Schema } from "mongoose";

const salarySchema = new Schema({

   employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
   basicSalary: { type: Number, required: true },
   allowances: { type: Number },
   deductions: { type: Number },
   netSalary: { type: Number },
   payDate: { type: Date, required: true },
   createAt: { type: Date, default: Date.now },
   updateAt: { type: Date, default: Date.now }
})

const Salary = mongoose.model("Salary", salarySchema)
export default Salary