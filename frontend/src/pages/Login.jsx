import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'


const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLogInInfo = { ...loginInfo };
    copyLogInInfo[name] = value
    setLoginInfo(copyLogInInfo)
  }

  const navigate = useNavigate()

  console.log(loginInfo)

  const handleLogin = async (e) => {
    e.preventDefault();
    const { name, email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Enter email & password in correct format')
    }

    try {
      const url = 'http://localhost:5001/auth/login';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      // console.log(result)

      // Show Success Message
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message)

        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)

        setTimeout(() => {
          navigate('/home')
        }, 1000)
      }
      else if (error) {
        const errMsg = error?.details[0].message
        handleError(errMsg)
      }
      else if (!success) {
        handleError(message)
      }
      console.log(result)
    }

    catch (error) {
      handleError(error)
    }
  }
  return (
    <div className='container'>
      <h1>Login</h1>
      <form action="" onSubmit={(e) => handleLogin(e)}>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" placeholder='Enter your Email' onChange={handleChange} value={loginInfo.email} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="" placeholder='Enter your Password' onChange={handleChange} value={loginInfo.password} />
        </div>
        <button type="submit">Login</button>
        <span>Don't have an account <Link to='/signup'>Sign up</Link>  </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login