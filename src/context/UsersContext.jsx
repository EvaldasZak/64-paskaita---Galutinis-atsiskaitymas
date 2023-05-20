import {
  useReducer,
  useEffect,
  useState,
  createContext,
  useCallback,
} from "react";
import { getUsers, registerUser } from "../api/users";

const UsersContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "REGISTER_USER":
      return [...state, action.payload];
    case "LOGOUT_USER":
      return [];
    default:
      return state;
  }
};

const UsersProvider = ({ children }) => {
  const [users, dispatch] = useReducer(reducer, []);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async (dispatch) => {
    try {
      const items = await getUsers();
      dispatch({ type: "FETCH_USERS", payload: items });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const registerUserApi = async (dispatch, user) => {
    try {
      const item = await registerUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(item));
      setCurrentUser(item);
      dispatch({ type: "REGISTER_USER", payload: item });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const loginUser = async (dispatch, user) => {
    try {
      setCurrentUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setCurrentUser(null);
  };
  const fetchUsersCallback = useCallback(fetchUsers, []);

  useEffect(() => {
    const tryLocalLogin = async () => {
      await fetchUsersCallback(dispatch);
      const storageUser = localStorage.getItem("loggedInUser");
      if (storageUser) {
        setCurrentUser(JSON.parse(storageUser));
      }
    };

    tryLocalLogin();
  }, [fetchUsersCallback, dispatch, setCurrentUser]);

  return (
    <UsersContext.Provider
      value={{
        users,
        dispatch,
        currentUser,
        registerUserApi,
        loginUser,
        logout,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
export { UsersProvider };
