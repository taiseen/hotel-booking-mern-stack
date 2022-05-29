import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '../../constants/actionTypes';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';
import { sign_in, sign_up } from '../../constants/dataFetch';
import { useState, useEffect } from 'react';
import './Login.scss';
import demoData from '../../constants/demoData';


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


    const handleAccount = () => {
        // 🔄 signIn / signUp form toggling
        setCreateAccount(!createAccount);

        // for clearing error status
        dispatch({ type: LOGOUT });
    }


    // only collect data from input fields...
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials(prev => ({ ...prev, [id]: value }));
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
                            {
                                demoData.userLoginInput.map(input => (
                                    <input
                                        key={input.label}
                                        id={input.id}
                                        type={input.type}
                                        className="loginInput"
                                        placeholder={input.placeholder}
                                        onChange={handleChange}
                                    // value={credentials.userName}
                                    />
                                ))
                            }
                            <button className="loginBtn" onClick={handleClick}>Register</button>

                            <p
                                onClick={handleAccount}
                                className='accountCreate'
                            >
                                Already have an Account. <strong>Click Here</strong>
                            </p>

                            {error ? <span>{error.message}</span> : null}
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

                            {error ? <span>{error.message}</span> : <span></span>}
                        </>
                }
            </div>
        </div>
    )
}

export default Login