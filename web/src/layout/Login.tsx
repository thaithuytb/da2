import React, { useState } from 'react';
import '../css/login.css'

const Login = () => {

  const [checkDisplay, setCheckDisplay] = useState<boolean>(true)

  const login = () => {
    console.log("login")
  }
  const register = () => {
    console.log("register")
  }
  return (
    <div className='login'>
      {checkDisplay ?
        (
          <div>
            <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder='email...'></input>
              <br />
              <label htmlFor="email">Password</label>
              <input type="password" id="password" name="password" placeholder='password...'></input>
              <br />
              <input type="button" value="Login" onClick={login} />
            </form>
            <div>Chua co tai khoan? <span onClick={() => setCheckDisplay(!checkDisplay)}>Register</span></div>
          </div>
        )
        :
        (
          <div>
            <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder='email...'></input>
              <br />
              <label htmlFor="email">Password</label>
              <input type="password" id="password" name="password" placeholder='password...'></input>
              <br />
              <input type="button" value="Register" onClick={register} />
            </form>
            <div>Da co tai khoan? <span onClick={() => setCheckDisplay(!checkDisplay)}>Login</span></div>
          </div>
        )}



    </div>
  )
}

export default Login