import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";

import UsersContext from "../../context/UsersContext";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      margin-bottom: 1rem;

      label {
        font-weight: bold;
      }

      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
      }
    }

    button[type="submit"] {
      padding: 0.5rem 1rem;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  }

  a {
    display: block;
    text-align: center;
    margin-top: 1rem;
  }
`;

const Login = () => {
  const { users, dispatch, loginUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length < 3) {
      alert("Fill in email address");
      return;
    }
    if (password.length < 1) {
      alert("Fill in password");
      return;
    }

    const loggedInUser = users.find(
      (user) => email === user.email && password === user.password
    );
    if (loggedInUser) {
      loginUser(dispatch, loggedInUser);
      navigate("/");

      setEmail("");
      setPassword("");
    } else {
      setPassword("");
      alert("User with these credentials is not found!");
    }
  };

  return (
    <LoginContainer>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Don't have an account?</Link>
      </div>
    </LoginContainer>
  );
};

export default Login;
