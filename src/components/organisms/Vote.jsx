import React, { useContext } from "react";
import QuestionsContext from "../../context/QuestionsContext";

const Vote = ({ type, id, rating, object }) => {
  const {
    upvoteQuestion,
    downvoteQuestion,
    upvoteAnswer,
    downvoteAnswer,
    dispatch,
  } = useContext(QuestionsContext);

  const handleUpvote = () => {
    const newObj = { ...object, rating: object.rating + 1 };
    if (type === "question") {
      upvoteQuestion(dispatch, id, newObj);
    } else if (type === "answer") {
      upvoteAnswer(dispatch, id, newObj);
    }
  };

  const handleDownvote = () => {
    const newObj = { ...object, rating: object.rating - 1 };
    if (type === "question") {
      downvoteQuestion(dispatch, id, newObj);
    } else if (type === "answer") {
      downvoteAnswer(dispatch, id, newObj);
    }
  };
  return (
    <div className="vote-component">
      <div className="question-vote">
        <div className="vote-arrows">
          <span className="up-arrow" onClick={handleUpvote}>
            ▲
          </span>
          <span className="down-arrow" onClick={handleDownvote}>
            ▼
          </span>
        </div>
        <span className="vote-count">{rating}</span>
      </div>
    </div>
  );
};

export default Vote;
