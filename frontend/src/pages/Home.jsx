import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {


  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }


  return (
    <div>
      <h1>Welcome, <span style={{ color: 'blue', fontSize: '40px' }}>{loggedInUser.toUpperCase()}</span></h1>
      <button onClick={handleLogout}>Log Out</button>
      <ToastContainer />
    </div>
  )
}

export default Home