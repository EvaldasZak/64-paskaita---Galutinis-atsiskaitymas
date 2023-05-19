import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';

import UsersContext from './context/UsersContext';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';

import Header from './components/organisms/Header';
import Profile from './components/pages/Profile';


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
          <Route index element={<Home />} />
          {
            !currentUser ? (
              <>
                <Route path='/login'>
                  <Route index element={<Login />} />
                </Route>
                <Route path='/register'>
                  <Route index element={<Register />} />
                </Route>
              </>
            ) : (
              <>
                <Route path='/profile'>
                  <Route index element={<Profile />} />
                </Route>
              </>
            )
          }

          <Route path='*' element={<h1>Error 404</h1>} />
        </Routes>
      </AppContainer>
    </>
  );
}

export default App;