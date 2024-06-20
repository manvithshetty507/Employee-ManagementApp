import React, { useState } from 'react';
import styles from '../styles/createEmployee.module.css'; 
import Navbar from '../components/navs';
import axios from 'axios';
import { useNavigate } from 'react-router';

function CreateEmployeePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image 
    };

    if(name && email && mobile && designation && gender && course) {
      const postURL = "http://localhost:3000/employee/add"

      axios.post(postURL, employeeData)
      .then(response => {
        console.log('Employee creation successful:', response.data);
        
        setName('');
        setEmail('');
        setMobile('');
        setDesignation('');
        setGender('')
        setCourse('')
        setImage('');
        alert("Employee Created");
        
        navigate("/dashboard");
      })
      .catch(error => {
        console.error('Failed to create employee:', error);
      });

    }else {
      alert("Please Enter All details")
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.formContainer}>
        <h2>Create Employee</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input type="text" className={styles.inputField} value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input type="email" className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Mobile No:</label>
            <input type="text" className={styles.inputField} value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Designation:</label>
            <select className={styles.inputField} value={designation} onChange={(e) => setDesignation(e.target.value)} required>
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
                <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} /> Male
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} /> Female
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Course:</label>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" value="MCA" checked={course === "MCA"} onChange={(e) => setCourse('MCA')} /> MCA
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" value="BCA" checked={course === "BCA"} onChange={(e) => setCourse('BCA')} /> BCA
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" value="BSC" checked={course === "BSC"} onChange={(e) => setCourse('BSC')} /> BSC
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.fileLabel}>Image URL:</label>
            <input type="text" className={styles.inputField} value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </>
  );
}



export default CreateEmployeePage;
