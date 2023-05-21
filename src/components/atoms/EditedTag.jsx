import React from "react";

const EditedTag = ({ edited }) => {
  return <>{edited && <i>edited</i>}</>;
};

export default EditedTag;
