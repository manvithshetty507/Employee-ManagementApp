import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EmployeeList from './EmployeePage';
import styles from '../styles/dashboard.module.css';
import Navbar from '../components/navs';

function Dashboard({ user }) {
  return (
    <div className={styles.dashboard}>
      <Navbar user={user}/>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Welcome user={user} />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </main>
    </div>
  );
}

function Welcome({ user }) {
  return (
    <div className={styles.welcome}>
      <h2>Welcome, {user ? user.username : 'Admin'}</h2>
      <p>Welcome to the Admin Panel. Use the navigation links above to manage employees.</p>
    </div>
  );
}

export default Dashboard;

