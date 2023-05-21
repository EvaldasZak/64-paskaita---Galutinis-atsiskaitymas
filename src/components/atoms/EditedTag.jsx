import React from "react";

const EditedTag = ({ edited }) => {
  return <>{edited && <i>This question was edited.</i>}</>;
};

export default EditedTag;
