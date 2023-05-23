import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components
const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 10px 0;
`;

const Navigation = styled.nav``;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: inline;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px;

  &:hover {
    background-color: #555;
  }
`;

const Header = ({ user, logout }) => {
  const handleLogout = () => {
    logout(); // Invoke the logout method
  };

  return (
    <>
      <HeaderWrapper>
        <Title>QQ</Title>
        <Navigation>
          <List>
            <ListItem>
              <NavLink to="/">Home</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/add">Ask a Question</NavLink>
            </ListItem>
            {!user ? (
              <>
                <ListItem>
                  <NavLink to="/login">Login</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/register">Register</NavLink>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <NavLink to="/profile">Profile</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="/" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </ListItem>
              </>
            )}
          </List>
        </Navigation>
      </HeaderWrapper>
    </>
  );
};

export default Header;
