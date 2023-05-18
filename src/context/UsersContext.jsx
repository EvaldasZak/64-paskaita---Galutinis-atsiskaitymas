import { useReducer, useEffect, useState, createContext } from "react";

const UsersContext = createContext()

const USERS_ACTION_TYPE = {
    GET: 'get_all_users',
    ADD: 'add_new_user'
}

const reducer = (state, action) => {
    switch (action.type){
        case USERS_ACTION_TYPE.GET:
            return action.data
        case USERS_ACTION_TYPE.ADD:
            fetch(`http://localhost:8080/users`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(action.data)
            })
            return [...state, action.data]
    }
}

const UsersProvider = ({children}) => {

    const [users, setUsers] = useReducer(reducer, [])

    const [currentUser, setCurrentUser] = useState(null)

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
            }}
        >
            {children}
        </UsersContext.Provider>
     );
}
 
export default UsersContext;
export {UsersProvider}