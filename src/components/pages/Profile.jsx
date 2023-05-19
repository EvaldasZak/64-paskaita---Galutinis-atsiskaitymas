import React, { useContext } from 'react';
import styled from 'styled-components';
import UsersContext from '../../context/UsersContext';

const ProfileContainer = styled.main`
  display: flex;
  justify-content: center;
`;

const ProfileSection = styled.section`
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Profile = () => {
  const { currentUser } = useContext(UsersContext);

  return (
    <ProfileContainer>
      <ProfileSection>
        <h2>{currentUser.name} profile</h2>
        <p>Email: {currentUser.email}</p>
        <ProfileImage>
          <Image src={currentUser.avatar} alt="" />
        </ProfileImage>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default Profile;
