import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <>
      <header>
        <h1>QQ</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>

            </li>
            <li>
              <Link to="/add">Ask a Question</Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header