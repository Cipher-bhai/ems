/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
   const [departments, setDepartments] = useState([])
   const [formData, setFormData] = useState({})
   const navigate = useNavigate();

   useEffect(() => {
      const getDepartments = async () => {
         const departments = await fetchDepartments()
         setDepartments(departments)
      }
      getDepartments()
   }, [])

   const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "image") {
         setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
      } else {
         setFormData((prevData) => ({ ...prevData, [name]: value }))
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);


     const formDataObj = new FormData() 
     Object.keys(formData).forEach((key)=>{
      formDataObj.append(key,formData[key])
     })
       
      try {
         const response = await axios.post('https://ems-backend-snhp.onrender.com/api/employee/add', formDataObj, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
         })
         if (response.data.success) {
            navigate("/admin-dashboard/employees") 
         }
      } catch (error) {
         if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
         }
      }

   }

   return (
      <div className="flex justify-center items-center mt-10 p-8  bg-gray-100">
         <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
               Add  New Employee
            </h2>

            {/* Name  Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                     Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter name"
                     required
                  />
               </div>

               {/* Email Field */}
               <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter email"
                     required
                  />
               </div>
            </div>

            {/* Employee ID   */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                  <label
                     htmlFor="employeeId"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Employee ID
                  </label>
                  <input
                     type="text"
                     id="employeeId"
                     name="employeeId"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter employee ID"
                     required
                  />
               </div>
               {/* DOB Field */}
               <div>
                  <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
                     Date of Birth
                  </label>
                  <input
                     type="date"
                     id="dob"
                     name="dob"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>
            </div>

            {/* Gender Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="mb-4">
                  <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                     Gender
                  </label>
                  <select
                     id="gender"
                     name="gender"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  >
                     <option value="">Select gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                  </select>
               </div>

               {/* Marital Status Field */}
               <div className="mb-4">
                  <label
                     htmlFor="maritalStatus"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Marital Status
                  </label>
                  <select
                     id="maritalStatus"
                     onChange={handleChange}
                     name="maritalStatus"
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  >
                     <option value="">Select marital status</option>
                     <option value="Single">Single</option>
                     <option value="Married">Married</option>
                  </select>
               </div>
            </div>
            {/* Designation Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="mb-4">
                  <label
                     htmlFor="designation"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Designation
                  </label>
                  <input
                     type="text"
                     id="designation"
                     name="designation"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter designation"
                     required
                  />
               </div>

               {/* Department Field */}
               <div className="mb-4">
                  <label
                     htmlFor="department"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Department
                  </label>
                  <select
                     id="department"
                     name="department"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter department"
                     required
                  >
                     <option value=""> Select Department </option>

                     {departments.map(dep => (
                        <option key={dep._id} value={dep._id}>{dep.dep_name} </option>
                     ))}
                  </select>
               </div>
            </div>

            {/* Salary Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="mb-4">
                  <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
                     Salary
                  </label>
                  <input
                     type="number"
                     id="salary"
                     name="salary"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter salary"
                     required
                  />
               </div>

               {/* Password Field */}
               <div className="mb-4">
                  <label
                     htmlFor="password"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                     placeholder="***********"
                     required
                  />
               </div>
            </div>

            {/* Role Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div className="mb-4">
                  <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                     Role
                  </label>
                  <select
                     type="text"
                     id="role"
                     name="role"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter role"
                     required
                  >
                     <option value="">Select Role</option>
                     <option value="admin">Admin</option>
                     <option value="employee">Employee</option>
                  </select>
               </div>

               {/* Upload Image Field */}
               <div className="mb-6">
                  <label
                     htmlFor="image"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Upload Image
                  </label>
                  <input
                     type="file"
                     id="image"
                     name="image"
                     onChange={handleChange}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     accept="image/*"
                  />
               </div>
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
               Add Employee
            </button>
         </form>
      </div>
   );
};

export default Add;
