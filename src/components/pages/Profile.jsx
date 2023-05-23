import React, { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../context/UsersContext";
import Avatar from "../atoms/Avatar";

const ProfileContainer = styled.main`
  display: flex;
  justify-content: center;
`;

const ProfileSection = styled.section`
  text-align: center;
`;

const Profile = () => {
  const { currentUser } = useContext(UsersContext);

  return (
    <ProfileContainer>
      <ProfileSection>
        <h2>{currentUser.name} profile</h2>
        <p>Email: {currentUser.email}</p>
        <Avatar user={currentUser} />
      </ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;
