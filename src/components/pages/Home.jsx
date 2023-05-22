import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import QuestionsContext from "../../context/QuestionsContext";

import Vote from "../organisms/Vote";
import Sort from "../organisms/Sort";

import EditedTag from "../atoms/EditedTag";

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
`;

const Section = styled.section`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Question = styled.div`
  display: flex;
  flex-direction: "row";
`;

const H2 = styled.h2`
  margin: 0 0 10px;
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Select = styled.select`
  appearance: none;
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    background-color: #f9f9f9;
  }
`;

const SelectArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: #888 transparent transparent transparent;
  pointer-events: none;
`;

const VoteComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

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
      <Main>
        <Section>
          <H2>Latest Questions</H2>
          <div>
            <Sort setSortOrder={setSortOrder} />
            <div>
              <Label htmlFor="filter-select">Filter:</Label>
              <SelectWrapper>
                <Select
                  id="filter-select"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="answered">Answered</option>
                  <option value="unanswered">Unanswered</option>
                </Select>
                <SelectArrow></SelectArrow>
              </SelectWrapper>
            </div>
            {filteredQuestions.map((question) => (
              <div key={question.id}>
                <hr />
                <Question>
                  <VoteComponent>
                    <Vote
                      type="question"
                      rating={question.rating}
                      id={question.id}
                      object={question}
                    />
                  </VoteComponent>
                  <div>
                    <Link to={`/question/${question.id}`}>
                      <h3>{question.title}</h3>
                    </Link>
                    <p>{question.body}</p>
                    <EditedTag edited={question.edited} />
                  </div>
                </Question>
              </div>
            ))}
          </div>
        </Section>
      </Main>
    </>
  );
};

export default Home;
