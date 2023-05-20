import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import QuestionsContext from "../../context/QuestionsContext";
import UsersContext from "../../context/UsersContext";

import { Vote } from "../organisms/Vote";
import EditedTag from "../atoms/EditedTag";

const Question = () => {
  const { id } = useParams();
  const {
    dispatch,
    getQuestionByIdFromApi,
    updateQuestionInApi,
    deleteQuestionFromApi,
  } = useContext(QuestionsContext);
  const { currentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const fetchQuestion = useCallback(async () => {
    const fetchedQuestion = await getQuestionByIdFromApi(dispatch, id);
    setQuestion(fetchedQuestion);
  }, [getQuestionByIdFromApi, id, dispatch]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(question.title);
    setEditedBody(question.body);
  };

  const handleSave = () => {
    let item = {
      id,
      title: editedTitle,
      body: editedBody,
      userId: currentUser.id,
      edited: true,
    };

    updateQuestionInApi(dispatch, id, item);
    setIsEditing(false);
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      title: editedTitle,
      body: editedBody,
      edited: true,
    }));
  };

  const handleRemove = () => {
    deleteQuestionFromApi(dispatch, question.id);
    navigate("/");
  };

  if (!question) {
    return <div>Error: Question not found</div>;
  }

  return (
    <main>
      <section id="single-question">
        <div className="question">
          <Vote />
          <div className="question-details">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <h3>{question.title}</h3>
                <p>{question.body}</p>
                <EditedTag edited={question.edited} />

                {currentUser && currentUser.id === question.user_id && (
                  <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleRemove}>Remove</button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Question;
