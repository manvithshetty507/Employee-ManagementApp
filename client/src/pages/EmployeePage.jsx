import React, { useEffect, useState } from 'react';
import EmployeeList from '../components/employeeList';
import styles from '../styles/employeePage.module.css';
import Navbar from '../components/navs';
import axios from 'axios';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee/get');
        setEmployees(response.data.employees);
      }catch(err) {
        console.log(err);
      }
    }
    fetchEmployees();
  },[]);

  return (
    <>
    <Navbar />
    <div className={styles.app}>
      <div>
        <h1>All Your Employees</h1>
        <EmployeeList employees={employees} />
      </div>
    </div>
    </>
    
  );
}

export default EmployeePage;
