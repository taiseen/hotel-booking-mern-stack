import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from '../../constants/actionTypes';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { sign_in } from '../../hooks/useFetch';
import { useState } from 'react';
import './Login.scss'

const Login = () => {

  const navigate = useNavigate();
  const { error, dispatch } = useAuthContext();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  // 1st) 🟨🟨🟨 only collect data from input fields...
  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  // 2nd) 🟨🟨🟨 when user click at Login Button
  const handleClick = async (e) => {

    dispatch({ type: LOGIN_START });

    try {
      const { data } = await sign_in(credentials);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      navigate('/');
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.response.data })
    }
  }

  // 3rd) 🟨🟨🟨 only for user enter button...
  const handleEnterButtonPress = (e) => {
    if (e.key === 'Enter') return handleClick();
  }


  return (
    <div className='login'>

      <div className="container">

        <input
          type="text"
          id='email'
          className="loginInput"
          placeholder='Email'
          onChange={handleChange}
          value={credentials.email}
        />

        <input
          type="password"
          id='password'
          className="loginInput"
          placeholder='Password'
          onChange={handleChange}
          value={credentials.password}
          onKeyDown={handleEnterButtonPress}
        />

        <button
          className="loginBtn"
          onClick={handleClick}
        >
          Login
        </button>

        {
          error &&
          <span>{error.message}</span>
          // : <span className='success'>Login Successful</span>
        }

      </div>
    </div>
  )
}

export default Login