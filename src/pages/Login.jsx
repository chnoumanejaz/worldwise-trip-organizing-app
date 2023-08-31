import { useNavigate } from 'react-router-dom';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState('demoapp@nouman.com');
  const [password, setPassword] = useState('qwerty@123');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate('/app', {replace: true});
        toast.success('Logged in');
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={'primary'}>Login</Button>
        </div>
      </form>
    </main>
  );
}
