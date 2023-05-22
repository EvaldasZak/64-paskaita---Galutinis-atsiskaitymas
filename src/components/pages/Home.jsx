import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import QuestionsContext from "../../context/QuestionsContext";

import Vote from "../organisms/Vote";
import Sort from "../organisms/Sort";

import EditedTag from "../atoms/EditedTag";

const Home = () => {
  const { state } = useContext(QuestionsContext);
  const [sortOrder, setSortOrder] = useState("date-desc");
  const [filterOption, setFilterOption] = useState("all");

  // Sort the questions based on ID
  const sortedQuestions = [...state.questions].sort((a, b) => {
    if (sortOrder === "date-desc") {
      return b.id - a.id; // Descending order by ID
    } else if (sortOrder === "answers-desc") {
      return (
        state.answers.filter((answer) => answer.questionId === b.id).length -
        state.answers.filter((answer) => answer.questionId === a.id).length
      ); // Descending order by number of answers
    } else if (sortOrder === "answers-asc") {
      return (
        state.answers.filter((answer) => answer.questionId === a.id).length -
        state.answers.filter((answer) => answer.questionId === b.id).length
      );
    } else {
      return a.id - b.id; // Ascending order by ID
    }
  });

  // Filter questions based on the selected option
  const filteredQuestions = sortedQuestions.filter((question) => {
    if (filterOption === "all") {
      return true; // Show all questions
    } else if (filterOption === "answered") {
      return state.answers.some((answer) => answer.questionId === question.id);
    } else if (filterOption === "unanswered") {
      return !state.answers.some((answer) => answer.questionId === question.id);
    }
    return true;
  });

  return (
    <>
      <main>
        <section>
          <h2>Latest Questions</h2>
          <Sort setSortOrder={setSortOrder} />
          <div>
            <label htmlFor="filter-select">Filter:</label>
            <select
              id="filter-select"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>
          </div>
          {filteredQuestions.map((question) => (
            <div key={question.id}>
              <Vote
                type="question"
                rating={question.rating}
                id={question.id}
                object={question}
              />
              <Link to={`/question/${question.id}`}>
                <h3>
                  {question.title} - {question.id}
                </h3>
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
