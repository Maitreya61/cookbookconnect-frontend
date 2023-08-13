import React from 'react'
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div>
      <div className="not-login">
          <div className="saved-not-login">
            <div className="logo">
              <img src="RecipeLogo.jpg" alt="Logo" />
            </div>
            <div className="not-login-details">
              <h1>CookBookConnect</h1>
              <h3>Your Culinary Playground Awaits</h3>
              <h4>Dive In by Logging in! <Link to='/login'>Login</Link></h4>
              <h4>Not Registered yet? <Link to='/register'>Register</Link></h4>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NotLoggedIn
