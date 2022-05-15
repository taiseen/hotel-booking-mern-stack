import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from '../../constants/actionTypes';
import { useAuthContext } from '../../context/AuthContext';
import { baseUrl } from '../../constants/baseUrl';
import { useState } from 'react';
import axios from 'axios';
import './Login.scss';


const Login = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
    })

    const { user, loading, error, dispatch } = useAuthContext();

    console.log(user);
    console.log(credentials);

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }


    const handleClick = async (e) => {
        e.preventDefault();

        dispatch({ type: LOGIN_START });

        try {
            const res = await axios.post(`${baseUrl}/auth/sign-in`, credentials);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.response.data })
        }
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
                />

                <button className="loginBtn" onClick={handleClick}>Login</button>

                {
                    error ? <span>{error.message}</span> : <span className='success'>Login Successful</span>
                }

            </div>
        </div>
    )
}

export default Login