import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

import UsersContext from "../../context/UsersContext";

const RegisterContainer = styled.div`
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  avatar: Yup.string().required("Avatar URL is required"),
});

const Register = () => {
  const { users, dispatch, registerUserApi } = useContext(UsersContext);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const { name, email, password, avatar } = values;

    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password,
      avatar,
    };

    if (users.some((user) => user.email === email)) {
      alert("This user is already registered, login!");
    } else {
      registerUserApi(dispatch, newUser);
      navigate("/");
    }
  };

  return (
    <RegisterContainer>
      <div>
        <h2>Register</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label>Name:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label>Email:</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label>Confirm Password:</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label>Avatar URL:</label>
              <Field type="text" name="avatar" />
              <ErrorMessage name="avatar" component="div" className="error" />
            </div>
            <button type="submit">Register</button>
          </Form>
        </Formik>

        <Link to="/">Already registered</Link>
      </div>
    </RegisterContainer>
  );
};

export default Register;
