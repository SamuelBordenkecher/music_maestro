import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUSer = localStorage.getItem('user');
    if (storedUSer) {
      setUser(JSON.parse(storedUSer));
    }
  }, [])
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user])

  contextObj = {
    user,
    setUser,
  }
}

  return (
    <>
      <Outlet context = {contextObj}/>
    </>
  )

export default App
