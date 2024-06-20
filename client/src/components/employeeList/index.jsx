import React, { useState, useEffect } from 'react';
import styles from '../../styles/employeePage.module.css';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.png';

const EmployeeList = ({ employees }) => {
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(employees);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredList(
      employees.filter(employee =>
        employee.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, employees]);

  const handleClick = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  return (
    <div className={styles.employeeList}>
      <h2>Employee List</h2>
      <p className={styles.infoContainer}>
        <span className={styles.totalCount}>Total count: {filteredList.length}</span>
        <span className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </span>
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>SL no</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td><img src={employee.image ? employee.image : logo} alt="" width="50px" height="50px" style={{objectFit:"cover"}}/></td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>{employee.creationDate}</td>
              <td><button onClick={() => handleClick(employee._id)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
