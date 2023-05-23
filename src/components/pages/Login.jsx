import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import UsersContext from "../../context/UsersContext";
import FormContainer from "../UI/FormContainer";

const Login = () => {
  const { users, dispatch, loginUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setFieldValue }) => {
    const { email, password } = values;

    const loggedInUser = users.find(
      (user) => email === user.email && password === user.password
    );
    if (loggedInUser) {
      loginUser(dispatch, loggedInUser);
      navigate("/");
    } else {
      setFieldValue("password", "");
      alert("User with these credentials is not found!");
    }
  };

  return (
    <FormContainer>
      <div>
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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
            <button type="submit">Login</button>
          </Form>
        </Formik>
        <Link to="/register">Don't have an account?</Link>
      </div>
    </FormContainer>
  );
};

export default Login;
