import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.warn("Failed to parse user from localStorage:", err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextObj = { user, setUser, logout };

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      <Outlet context={contextObj} />
    </>
  );
}

export default App;
