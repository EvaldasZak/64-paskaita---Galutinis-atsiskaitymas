import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import QuestionsContext from "../../context/QuestionsContext";
import UsersContext from "../../context/UsersContext";

import { Vote } from "../organisms/Vote";
import EditedTag from "../atoms/EditedTag";
import Answer from "../organisms/Answer";

const Question = () => {
  const { id } = useParams();
  const {
    state,
    dispatch,
    updateQuestionInApi,
    deleteQuestionFromApi,
    addAnswerToApi,
    updateAnswerInApi,
    deleteAnswerFromApi,
  } = useContext(QuestionsContext);
  const { currentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const questionFound = state.questions.find(
      (question) => question.id === parseInt(id)
    );
    const answersFound = state.answers.filter(
      (answer) => answer.questionId === parseInt(id)
    );

    setQuestion(questionFound);
    setAnswers(answersFound);
  }, [state.questions, id, state.answers]);

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

  const handleAddAnswer = async () => {
    // Prepare the answer object
    const answer = {
      questionId: question.id,
      userId: currentUser.id,
      body: newAnswer,
      edited: false,
    };

    // Add the answer to the API
    await addAnswerToApi(dispatch, answer);

    // Reset the new answer input field
    setNewAnswer("");
  };

  const handleEditAnswer = (answerId) => {
    // Find the answer being edited and set its editing state to true
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === answerId ? { ...answer, edited: true } : answer
      )
    );
  };

  const handleSaveAnswer = (old_answer, editedAnswer) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === old_answer.id
          ? { ...answer, body: editedAnswer, edited: false }
          : answer
      )
    );

    // Update the answer in the API
    updateAnswerInApi(dispatch, old_answer.id, {
      ...old_answer,
      body: editedAnswer,
      edited: true,
    });
  };

  const handleRemove = () => {
    deleteQuestionFromApi(dispatch, question.id);
    navigate("/");
  };

  const handleDeleteAnswer = (id) => {
    deleteAnswerFromApi(dispatch, id);
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

                {currentUser && currentUser.id === question.userId && (
                  <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleRemove}>Remove</button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="answers">
          {answers &&
            answers.map((answer) => (
              <Answer
                key={answer.id}
                answer={answer}
                handleEditAnswer={handleEditAnswer}
                handleDeleteAnswer={handleDeleteAnswer}
                handleSaveAnswer={handleSaveAnswer}
                currentUser={currentUser}
              />
            ))}
        </div>
        {currentUser && (
          <div className="add-answer">
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Add your answer..."
            />
            <button onClick={handleAddAnswer}>Add Answer</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Question;
