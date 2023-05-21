import React, { useState } from "react";
import EditedTag from "../atoms/EditedTag";
import Vote from "./Vote";

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
    <div className="answer">
      {isEditing ? (
        <>
          <textarea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <Vote
            id={answer.id}
            type="answer"
            object={answer}
            rating={answer.rating}
          />
          <p>{answer.body}</p>
          <EditedTag edited={answer.edited} />
          {currentUser && currentUser.id === answer.userId && (
            <>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Remove</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Answer;
