import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';

import UsersContext from './context/UsersContext';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';


// Styled component
const AppContainer = styled.div`
  height: 50vh;
  padding: 0px 30px;
`;

const App = () => {
  const { currentUser } = useContext(UsersContext);

  return (
    <>
        <AppContainer>
      <Routes>

        {
          !currentUser ? (
            <>
              <Route index element={<Login />} />
              <Route path='/register'>
                <Route index element={<Register />} />
              </Route>
            </>
          ) : (
            <>
              <Route index element={<Home />} />
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