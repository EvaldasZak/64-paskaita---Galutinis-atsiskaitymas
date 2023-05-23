import React, { useContext } from "react";
import QuestionsContext from "../../context/QuestionsContext";
import styled from "styled-components";

const VoteComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const QuestionVote = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: column;
`;

const VoteArrows = styled.div`
  display: flex;
`;

const UpArrow = styled.span`
  display: inline-block;
  cursor: pointer;
  padding: 2px 5px;
  font-size: 14px;
  line-height: 1;
  color: #555555;

  &:hover {
    color: #ff9900;
  }
`;

const DownArrow = styled.span`
  display: inline-block;
  cursor: pointer;
  padding: 2px 5px;
  font-size: 14px;
  line-height: 1;
  color: #555555;

  &:hover {
    color: #ff9900;
  }
`;

const VoteCount = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

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
    <VoteComponent>
      <QuestionVote>
        <VoteCount>{rating}</VoteCount>
        <VoteArrows>
          <UpArrow onClick={handleUpvote}>▲</UpArrow>
          <DownArrow onClick={handleDownvote}>▼</DownArrow>
        </VoteArrows>
      </QuestionVote>
    </VoteComponent>
  );
};

export default Vote;
