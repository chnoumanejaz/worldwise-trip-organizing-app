import { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-hot-toast';
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'logout':
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error('Unknown Action type');
  }
}

const FAKE_USER = {
  name: 'Nouman',
  email: 'demoapp@nouman.com',
  password: 'qwerty@123', 
  avatar:
    'https://scontent.flyp6-1.fna.fbcdn.net/v/t39.30808-6/357411421_3523826944521761_1469838703262863187_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeHF2BDGOXz6N3W1n-3PNb1TiMOJZbBlxpCIw4llsGXGkFgYEVGmdMIho5EIi8rXe-1vfk7Kadxr2O_LxohrIPAe&_nc_ohc=wmQBf2QuBIsAX-WSQrH&_nc_zt=23&_nc_ht=scontent.flyp6-1.fna&oh=00_AfDPK4tZERq-Q09uyGixNgjFvJrgU0qHwPm49fVStDSAUA&oe=64F58AA8',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
    toast.success('Logged Out! 🙂')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext can not be used outside the AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
