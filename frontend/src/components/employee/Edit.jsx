/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

   const [employee, setEmployee] = useState({
      name: '',
      maritalStatus: '',
      designation: '',
      salary: 0,
      department: ''
   });
   const [departments, setDepartments] = useState(null)
   const navigate = useNavigate();
   const { id } = useParams()


   useEffect(() => {
      const getDepartments = async () => {
         const departments = await fetchDepartments()
         setDepartments(departments)
      }
      getDepartments()
   }, [])

   // useEffect(() => {
   //    const fetchEmployee = async () => {

   //       try {
   //          const response = await axios.get(`http://localhost:3000/api/employee/${id}`,
   //             {
   //                headers: {
   //                   "Authorization": `Bearer ${localStorage.getItem('token')}`
   //                },
   //             })


   //          if (response.data.success) {
   //             const employee = response.data.employee
   //             setEmployee((prev) => ({
   //                ...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus,
   //                designation: employee.designation, salary: employee.salary, department: employee.department
   //             }))
   //          }
   //       } catch (error) {
   //          if (error.response && !error.response.data.success) {
   //             alert(error.response.data.error)
   //          }
   //       }
   //    }
   //    fetchEmployee()
   // }, [])


   useEffect(() => {
      const fetchEmployee = async () => {
         try {
            const response = await axios.get(`https://ems-backend-hkt0.onrender.com/api/employee/${id}`, {
               headers: {
                  "Authorization": `Bearer ${localStorage.getItem('token')}`,
               },
            });
   
            if (response.data.success) {
               const employee = response.data.employee;
               setEmployee((prev) => ({
                  ...prev,
                  name: employee?.userId?.name || "",
                  maritalStatus: employee?.maritalStatus || "",
                  designation: employee?.designation || "",
                  salary: employee?.salary || 0,
                  department: employee?.department || "",
               }));
            }
         } catch (error) {
            console.error("Error fetching employee:", error);
            if (error.response && !error.response.data.success) {
               alert(error.response.data.error);
            }
         }
      };
   
      fetchEmployee();
   }, [id]);
   

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee((prevData) => ({ ...prevData, [name]: value }))

   }

   const handleSubmit = async (e) => {
      e.preventDefault();




      try {
         const response = await axios.put(`https://ems-backend-hkt0.onrender.com/api/employee/${id}`, employee, {
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
      <> {departments && employee ? (
         <div className="flex justify-center items-center mt-10 p-8  bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl  bg-white shadow-lg rounded-lg p-6">
               <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Edit Employee
               </h2>

                  <div>
               {/* Name  Fields */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
                  <div>
                     <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Name
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                        required
                     />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                        value={employee.maritalStatus}
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
                        value={employee.designation}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter designation"
                        required
                     />
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
                        value={employee.salary}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter salary"
                        required
                     />
                  </div>
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
                     value={employee.department}
                     className="w-[350px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     placeholder="Enter department"
                     required
                  >
                     <option value=""> Select Department </option>

                     {departments.map(dep => (
                        <option key={dep._id} value={dep._id}>{dep.dep_name} </option>
                     ))}
                  </select>
               </div>



               {/* Submit Button */}
               <button
                  type="submit"
                  className="w-[350px] bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
               >
                  Edit Employee
               </button>
         </div>

            </form >
         </div >
      ) : <div> Loading...</div>} </>
   );
};

export default Edit;
