import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'


const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value
    setSignupInfo(copysignupInfo)
  }

  const navigate = useNavigate()

  console.log(signupInfo)

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Enter name, email & password in correct format')
    }

    try {
      const url = 'http://localhost:5001/auth/signup';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json();
      // console.log(result)

      // Show Success Message
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
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
      <h1>Sign Up</h1>
      <form action="" onSubmit={(e) => handleSignup(e)}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" name="name" id="" placeholder='Enter your name' autoFocus onChange={handleChange} value={signupInfo.name} />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" placeholder='Enter your Email' onChange={handleChange} value={signupInfo.email} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="" placeholder='Enter your Password' onChange={handleChange} value={signupInfo.password} />
        </div>
        <button type="submit">Sign Up</button>
        <span>Already have an account <Link to='/login'>Sign</Link>  </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup