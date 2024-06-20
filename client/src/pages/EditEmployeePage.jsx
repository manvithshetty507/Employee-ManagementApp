import React, { useEffect, useState } from 'react'
import Navbar from '../components/navs'
import styles from '../styles/editModulePage.module.css'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/employee/getById/${id}`);
          const employee = response.data.employee;
  
          if (employee) {
            setEmployee({
              name: employee.name || '',
              email: employee.email || '',
              mobile: employee.mobile || '',
              designation: employee.designation || '',
              gender: employee.gender || '',
              course: employee.course || ''
            });
          }
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
  
      fetchEmployee();
  },[id]);

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        const response = axios.patch(`http://localhost:3000/employee/edit/${id}`, employee);
        if(response.status === 200) {
            setEmployee({
                name: '',
                email: '',
                mobile: '',
                designation: '',
                gender: '',
                course: ''
              })
            alert("Employee edited")
        }
    }catch(err) {
        console.log(err);
    }
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newCourses = checked 
                ? [...employee.course, value]
                : employee.course.filter(course => course !== value);
            setEmployee({ ...employee, course: newCourses });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
  }

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
          <h2>Edit Employee</h2>
          <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                  <label className={styles.label}>Name:</label>
                  <input
                      type="text"
                      name="name"
                      className={styles.inputField}
                      value={employee.name}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label}>Email:</label>
                  <input
                      type="email"
                      name="email"
                      className={styles.inputField}
                      value={employee.email}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label}>Mobile No:</label>
                  <input
                      type="text"
                      name="mobile"
                      className={styles.inputField}
                      value={employee.mobile}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label}>Designation:</label>
                  <select
                      name="designation"
                      className={styles.inputField}
                      value={employee.designation}
                      onChange={handleChange}
                      required
                  >
                      <option value="">Select Designation</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales">Sales</option>
                  </select>
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label}>Gender:</label>
                  <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                          <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={employee.gender === 'Male'}
                              onChange={handleChange}
                          /> Male
                      </label>
                      <label className={styles.radioLabel}>
                          <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={employee.gender === 'Female'}
                              onChange={handleChange}
                          /> Female
                      </label>
                  </div>
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label}>Course:</label>
                  <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}>
                          <input
                              type="checkbox"
                              name="course"
                              value="MCA"
                              checked={employee.course.includes('MCA')}
                              onChange={handleChange}
                          /> MCA
                      </label>
                      <label className={styles.checkboxLabel}>
                          <input
                              type="checkbox"
                              name="course"
                              value="BCA"
                              checked={employee.course.includes('BCA')}
                              onChange={handleChange}
                          /> BCA
                      </label>
                      <label className={styles.checkboxLabel}>
                          <input
                              type="checkbox"
                              name="course"
                              value="BSC"
                              checked={employee.course.includes('BSC')}
                              onChange={handleChange}
                          /> BSC
                      </label>
                  </div>
              </div>
              <button type="submit" className={styles.button}>Update</button>
          </form>
      </div>
        </>
  )
}

export default EditEmployeePage