import React, { useState } from "react";
import styled from "styled-components";

import EditedTag from "../atoms/EditedTag";
import Vote from "./Vote";

const AnswerContainer = styled.div`
  margin-bottom: 10px;

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: vertical;
    margin-bottom: 10px;
  }

  button {
    padding: 8px 20px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const AnswerStyle = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 50px;
  background-color: #eee;
  padding: 10px;
`;

const Space = styled.div`
  height: 10px;
`;

const Answer = ({
  answer,
  handleEditAnswer,
  handleSaveAnswer,
  currentUser,
  handleDeleteAnswer,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer.body);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAnswer(answer.body);
    handleEditAnswer(answer.id);
  };

  const handleSave = () => {
    handleSaveAnswer(answer, editedAnswer);
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteAnswer(answer.id);
  };

  return (
    <AnswerContainer className="answer">
      <AnswerStyle>
        <Vote
          id={answer.id}
          type="answer"
          object={answer}
          rating={answer.rating}
        />
        <div>
          <p>{answer.body}</p>
          <EditedTag edited={answer.edited} />

          {currentUser && currentUser.id === answer.userId && (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Remove</button>
            </div>
          )}
          <Space />
          {isEditing && (
            <div>
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          )}
        </div>
      </AnswerStyle>
    </AnswerContainer>
  );
};

export default Answer;
