import React from "react";

const Answer = ({ answer }) => {
  return (
    <div className="answer">
      <p>{answer.body}</p>
      {/* <p>{answer.id}</p> */}
      <div className="answer-details"></div>
    </div>
  );
};

export default Answer;
