import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuestionsContext from "../../context/QuestionsContext";
import UsersContext from "../../context/UsersContext";

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
    <div>
      <h2>Ask a question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={handleBodyChange} />
        </div>
        <button type="submit">Ask a question</button>
      </form>
    </div>
  );
};

export default Add;
