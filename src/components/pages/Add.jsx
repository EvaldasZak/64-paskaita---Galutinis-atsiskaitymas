import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import QuestionsContext from "../../context/QuestionsContext";
import UsersContext from "../../context/UsersContext";

const AskQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 600px;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;

      label {
        margin-right: 10px;
      }

      input,
      textarea {
        width: 80%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
    }

    button {
      padding: 8px 20px;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
      max-width: 200px;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const Add = () => {
  const { state, dispatch, addQuestionToApi } = useContext(QuestionsContext);
  const { currentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (body.length === 0 || title.length === 0) {
      alert("Fill in form fields");
      return;
    }

    const newQuestions = {
      id: state.questions[state.questions.length - 1].id + 1,
      title,
      body,
      userId: currentUser.id,
      edited: false,
      rating: 1,
    };

    addQuestionToApi(dispatch, newQuestions);

    navigate("/");
  };

  return (
    <AskQuestionContainer>
      <h2>Ask a question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question-title">Title:</label>
          <input
            type="text"
            id="question-title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="question-body">Body:</label>
          <textarea
            id="question-body"
            value={body}
            onChange={handleBodyChange}
          />
        </div>
        <button type="submit">Ask a question</button>
      </form>
    </AskQuestionContainer>
  );
};

export default Add;
