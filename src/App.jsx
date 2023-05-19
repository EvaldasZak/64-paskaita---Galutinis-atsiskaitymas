import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';

import ProtectedRoute from './helpers/ProtectedRoute';

import UsersContext from './context/UsersContext';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';

import Header from './components/organisms/Header';
import Profile from './components/pages/Profile';
import Add from './components/pages/Add';


// Styled component
const AppContainer = styled.div`
  height: 50vh;
  padding: 0px 30px;
`;

const App = () => {
  const { currentUser, logout } = useContext(UsersContext);

  return (
    <>
      <AppContainer>
        <Header user={currentUser} logout={logout} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/add" element={
            <ProtectedRoute user={currentUser}>
              <Add />
            </ProtectedRoute>
          }
          />

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
}

export default App;