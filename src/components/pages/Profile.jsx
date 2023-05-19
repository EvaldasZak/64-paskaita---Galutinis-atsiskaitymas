import React, {useContext} from 'react';
import UsersContext from '../../context/UsersContext'

const Profile = () => {

    const { currentUser } = useContext(UsersContext);

  return (
    <>
      <main>
        <section>
          <h2>Profile</h2>
          <p>Email: {currentUser.email}</p>
        </section>
      </main>
    </>
  )
}

export default Profile;