import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

import ProtectedRoute from "./helpers/ProtectedRoute";

import UsersContext from "./context/UsersContext";

import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";

import Header from "./components/organisms/Header";
import Add from "./components/pages/Add";
import Profile from "./components/pages/Profile";
import Question from "./components/pages/Question";

// Styled component
const AppContainer = styled.div`
  max-width: 1000px;
  margin: 0 80px;
  padding: 0;
`;

const App = () => {
  const { currentUser, logout } = useContext(UsersContext);

  return (
    <>
      <Header user={currentUser} logout={logout} />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/add"
            element={
              <ProtectedRoute user={currentUser}>
                <Add />
              </ProtectedRoute>
            }
          />
          <Route path="/question/:id" element={<Question />} />

          {!currentUser ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <Route path="/profile" element={<Profile />} />
          )}

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </AppContainer>
    </>
  );
};

export default App;
