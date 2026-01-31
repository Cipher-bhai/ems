/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {

   const [salary, setSalary] = useState({
      employeeId: null,
      bsicSalary: 0,
      allowances: 0,
      deductions: 0,
      payDate: null,
   });

   const [departments, setDepartments] = useState(null)
   const [employees, setEmployees] = useState([])
   const navigate = useNavigate();



   useEffect(() => {
      const getDepartments = async () => {
         const departments = await fetchDepartments()
         setDepartments(departments)
      };

      getDepartments();
   }, []);

   const handleDepartment = async (e) => {
      const emps = await getEmployees(e.target.value)
      setEmployees(emps)
   }


   const handleChange = (e) => {
      const { name, value } = e.target;
      setSalary((prevData) => ({ ...prevData, [name]: value }))

   }

   const handleSubmit = async (e) => {
      e.preventDefault();




      try {
         const response = await axios.post(`https://ems-backend-snhp.onrender.com/api/salary/add`, salary, {
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
      <> {departments ? (
         <div className="flex justify-center items-center mt-10 p-8  bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl  bg-white shadow-lg rounded-lg p-6">
               <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">   Add Salary  </h2>

               {/* Department Field */}
               <div className="mb-4">
                  <label
                     htmlFor="department"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Department
                  </label>
                  <select
                     name="department"
                     onChange={handleDepartment}
                     className="w-[350px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter department"
                     required
                  >
                     <option value=""> Select Department </option>

                     {departments.map(dep => (
                        <option key={dep._id} value={dep._id}>
                           {dep.dep_name}
                        </option>
                     ))}
                  </select>
               </div>

               {/* {employee} */}
               <div className="mb-4">
                  <label
                     htmlFor="department"
                     className="block text-gray-700 font-medium mb-2"
                  >
                     Employee
                  </label>
                  <select
                     name="employeeId"
                     onChange={handleChange}
                     className="w-[350px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter department"
                     required
                  >
                     <option value=""> Select Employee </option>
                     {employees.map(emp => (
                        <option key={emp._id} value={emp._id}>
                           {emp.employeeId}
                        </option>
                     ))}
                  </select>
               </div>



               {/*  Basic Salary Field */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                     <label
                        htmlFor="designation"
                        className="block text-gray-700 font-medium mb-2"
                     >
                        Basic Salary
                     </label>
                     <input
                        type="number"
                        name="basicSalary"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="basic salary"
                        required
                     />
                  </div>

               </div>

               {/*  Allowances Field */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                     <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
                        Allowances
                     </label>
                     <input
                        type="number"
                        name="allowances"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="allowances"
                        required
                     />
                  </div>
               </div>

               {/* {  deductions } */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                     <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
                        Deductions
                     </label>
                     <input
                        type="number"
                        name="deductions"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="deductions"
                        required
                     />
                  </div>
               </div>

               {/* {pay date} */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="mb-4">
                     <label htmlFor="salary" className="block text-gray-700 font-medium mb-2">
                        Pay Date
                     </label>
                     <input
                        type="date"
                        name="payDate"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>

               </div>


               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-[350px] bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
               >
                 Add Salary
               </button>


            </form >
         </div >
      ) : <div> Loading...</div>} </>
   );
};

export default Add;

