import React from 'react'
import styles from '../../styles/dashboard.module.css'
import { Link } from 'react-router-dom'

function Navbar({user}) {
  return (
    <header className={styles.header}>
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/dashboard">Home</Link>
          <Link className={styles.navLink} to="/employees">Employee List</Link>
          <Link className={styles.navLink} to="/employees/create">Create Employee</Link>
        </nav>
      </header>
  )
}

export default Navbar