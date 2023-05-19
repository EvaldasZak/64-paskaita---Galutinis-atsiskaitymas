import { useReducer, useEffect, useState, createContext } from "react";

const UsersContext = createContext()

const USERS_ACTION_TYPE = {
  GET: 'get_all_users',
  ADD: 'add_new_user',
  LOGOUT: 'logout_user',
};

const reducer = (state, action) => {
  switch (action.type) {
    case USERS_ACTION_TYPE.GET:
      return action.data;
    case USERS_ACTION_TYPE.ADD:
      fetch(`http://localhost:8080/users`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(action.data),
      });
      return [...state, action.data];
    case USERS_ACTION_TYPE.LOGOUT: // Handle logout action
      return []; // Clear the user state
    default:
      return state;
  }
};


const UsersProvider = ({ children }) => {

  const [users, setUsers] = useReducer(reducer, [])
  const [currentUser, setCurrentUser] = useState(null)

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then(data => {
        setUsers({
          type: USERS_ACTION_TYPE.GET,
          data: data
        })
      })
  }, [])

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        USERS_ACTION_TYPE,
        currentUser,
        setCurrentUser,
        logout
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export default UsersContext;
export { UsersProvider }