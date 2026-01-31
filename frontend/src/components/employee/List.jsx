/**
 * Copyright (c) 2026 Satyendra Bharti
 * Licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { EmployeeButtons } from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee,setFilteredEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('https://ems-backend-snhp.onrender.com/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Employee Data:', response.data);

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || 'N/A', 
            name: emp.userId?.name || 'N/A', 
            dob: new Date(emp.dob).toDateString(),
            profileImage: <img width={70} className='rounded' src={` https://ems-backend-snhp.onrender.com/${emp.userId?.profileImage || ''}`} />,
            action: <EmployeeButtons _id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) =>{
    const records = employees.filter((emp)=>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Employee Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <div>
        <DataTable className='mt-6'
          columns={columns}
          data={filteredEmployee}
        pagination
        />
      </div>
    </div>
  );
};

export default List;
