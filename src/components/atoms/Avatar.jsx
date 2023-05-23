import React from "react";
import styled from "styled-components";

const ProfileImage = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Avatar = ({ user, size = 200 }) => {
  return (
    <ProfileImage size={size}>
      <Image src={user.avatar} alt="" />
    </ProfileImage>
  );
};

export default Avatar;
