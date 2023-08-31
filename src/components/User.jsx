import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './User.module.css';

function User() {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
 