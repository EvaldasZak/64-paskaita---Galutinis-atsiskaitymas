import React from "react";
import styled from "styled-components";

const Space = styled.div`
  height: 10px;
`;

const EditedTag = ({ edited }) => {
  return (
    <>
      {edited && (
        <div>
          <i>edited</i>
          <Space />
        </div>
      )}
    </>
  );
};

export default EditedTag;
