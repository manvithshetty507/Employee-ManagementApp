import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Corrected the import
import styles from '../../styles/header.module.css'; // Import the CSS module

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    setUser({username:'',password:''});
  };

  useEffect(() => {
    if (user && !user.username) {
      navigate('/');
    }
  }, [user?.username, navigate]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles['user-info']}>
        {user?.username ? (
          <>
            <p>{user.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
