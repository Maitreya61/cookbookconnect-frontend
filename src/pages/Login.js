import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    /* eslint-disable */
    const [_, setCookies] = useCookies(["access_token"])
    /* eslint-enable */

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://cookbookconnect-backend2.vercel.app/auth/login", {
                username,
                password,
            });
            
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/")

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor="username">UserName</label>
                    <input type="text" id='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type='submit' className='button'>Login</button>
                <div className='login'>
                    <span><h3>Not a User? <Link to="/register">Register</Link> </h3></span>
                </div>
            </form>
        </div>
    )
}

export default Login
