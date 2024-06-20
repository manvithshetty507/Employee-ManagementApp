import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/login.module.css';
import { useNavigate } from 'react-router-dom';

function LoginPage({ user, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", user)
    if (user && user.username) {
      navigate('/dashboard');
    }
  }, [user?.username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { username, password });
    const getUserURL = 'http://localhost:3000/user/get';

    try {
      const response = await axios.post(getUserURL, { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response:", response.data);
      if (response.status === 200) {
        console.log("Login SUCCESS");
        setError('');
        setUser({ username, password }); 
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        {error && <div className={styles.errorContainer}><p>{error}</p></div>}
        <div className={styles.inputGroup}>
          <label htmlFor='user' className={styles.label}>User: </label>
          <input
            type="text"
            placeholder='User Name'
            id='user'
            className={styles.input}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='pass' className={styles.label}>Password: </label>
          <input
            type="password"
            placeholder='Password'
            id='pass'
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
