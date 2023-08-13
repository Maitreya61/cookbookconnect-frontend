import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://cookbookconnect-backend.vercel.app/auth/register", {
                username,
                password,
            });
            if(response.data.Error === 'user already exists'){
                alert("User Already Exists");
            }else{
                alert("Registered Succesfully!");
            }
            
        } catch (err) {
            alert(err)
        }

    }

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className='form-group'>
                    <label htmlFor="username">UserName</label>
                    <input type="text" id='username' value={username} required onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' required value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type='submit' className='button'>Register</button>
                <div className='login'>
                    <span><h3> Existing User? <Link to="/login">Login</Link> </h3></span>
                </div>
            </form>
        </div>
    )
}

export default Register
