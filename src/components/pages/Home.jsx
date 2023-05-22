import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import QuestionsContext from "../../context/QuestionsContext";

import Vote from "../organisms/Vote";
import Sort from "../organisms/Sort";

import EditedTag from "../atoms/EditedTag";

const Home = () => {
  const { state } = useContext(QuestionsContext);
  const [sortById, setSortById] = useState(false);

  // Sort the questions based on ID
  const sortedQuestions = [...state.questions].sort((a, b) => {
    if (sortById) {
      return b.id - a.id; // Descending order
    } else {
      return a.id - b.id; // Ascending order
    }
  });

  const toggleSortOrder = () => {
    setSortById((prevSortById) => !prevSortById);
  };

  return (
    <>
      <main>
        <section>
          <h2>Latest Questions</h2>
          <Sort sortById={sortById} toggleSortOrder={toggleSortOrder} />
          {sortedQuestions.map((question) => (
            <div key={question.id}>
              <Vote
                type="question"
                rating={question.rating}
                id={question.id}
                object={question}
              />
              <Link to={`/question/${question.id}`}>
                <h3>{question.title}</h3>
              </Link>
              <p>{question.body}</p>
              <EditedTag edited={question.edited} />
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
