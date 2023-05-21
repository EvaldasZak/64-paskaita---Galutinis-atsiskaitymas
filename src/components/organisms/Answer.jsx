import React, { useState } from "react";
import EditedTag from "../atoms/EditedTag";

const Answer = ({
  answer,
  handleEditAnswer,
  handleSaveAnswer,
  currentUser,
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
          <p>{answer.body}</p>
          <EditedTag edited={answer.edited} />
          {currentUser && currentUser.id === answer.userId && (
            <>
              <button onClick={handleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Answer;
