import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from '../../constants/actionTypes';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';
import { sign_in, sign_up } from '../../constants/dataFetch';
import { useState, useEffect } from 'react';
import './Login.scss';


const Login = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { error, dispatch } = useAuthContext();
    const [createAccount, setCreateAccount] = useState(false);
    const [credentials, setCredentials] = useState({
        userName: undefined,
        email: undefined,
        password: undefined,
        city: undefined,
        country: undefined,
        phone: undefined,
    })

    useEffect(() => {
        // user come from pressing registration button
        setCreateAccount(location.state)
    }, [location.state])

    const handleAccount = () => setCreateAccount(!createAccount)

    // only collect data from input fields...
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }


    // when user click at Login Button
    const handleClick = async (e) => {
        // e.preventDefault();

        if (createAccount) {
            dispatch({ type: LOGIN_START });

            try {
                const { data } = await sign_up(credentials);
                dispatch({ type: LOGIN_SUCCESS, payload: data });
                navigate('/login');
                setCreateAccount(!createAccount)
            } catch (error) {
                dispatch({ type: LOGIN_FAILURE, payload: error.response.data })
            }
        } else {
            dispatch({ type: LOGIN_START });

            try {
                const { data } = await sign_in(credentials);
                dispatch({ type: LOGIN_SUCCESS, payload: data });
                navigate('/');
            } catch (error) {
                dispatch({ type: LOGIN_FAILURE, payload: error.response.data })
            }
        }
    }


    // only for user enter button...
    const handleEnterButtonPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }




    return (
        <div className='login'>
            <div className="container">

                <Link to='/'><p>Home Page</p></Link>

                {
                    createAccount
                        ? <>
                            <input
                                type="text"
                                id='userName'
                                className="loginInput"
                                placeholder='Name'
                                onChange={handleChange}
                                value={credentials.userName}
                            />

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

                            <input
                                type="text"
                                id='city'
                                className="loginInput"
                                placeholder='City'
                                onChange={handleChange}
                                value={credentials.city}
                            />

                            <input
                                type="text"
                                id='country'
                                className="loginInput"
                                placeholder='Country'
                                onChange={handleChange}
                                value={credentials.country}
                            />


                            <input
                                type="phone"
                                id='phone'
                                className="loginInput"
                                placeholder='Phone'
                                onChange={handleChange}
                                value={credentials.phone}
                            />

                            <button className="loginBtn" onClick={handleClick}>Register</button>

                            <p
                                onClick={handleAccount}
                                className='accountCreate'
                            >
                                Already have an Account. <strong>Click Here</strong>
                            </p>
                        </>
                        : <>

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

                            <button className="loginBtn" onClick={handleClick}>Login</button>

                            <p
                                onClick={handleAccount}
                                className='accountCreate'
                            >
                                Create an Account. <strong>Click Here</strong>
                            </p>

                            {
                                error &&
                                <span>{error.message}</span>
                                // : <span className='success'>Login Successful</span>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Login